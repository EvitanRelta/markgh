import { SetOptional } from 'type-fest'
import { memoGetUserName } from './getUserName'
import { getIssueData, getPullRequestData } from './githubDataGetters'
import { getClosedIssuesFromBodyText, hasIssueClosingKeywords } from './issueClosingKeywordParsers'
import type {
    ChangesData,
    ClosedIssueData,
    PullRequestData,
    ScrappedCommitData,
    ScrappedCommitDataWUserName,
} from './types'

type IssueNumber = number
type IntermediateClosedIssues = Record<IssueNumber, SetOptional<ClosedIssueData, 'issue'>>

export const getChangesFromScrappedCommits = async (
    scrappedCommits: ScrappedCommitData[]
): Promise<ChangesData> => {
    const prMerges = scrappedCommits.filter((commit) => isPullRequestMerge(commit.title))
    const issueClosingCommits = scrappedCommits.filter((commit) =>
        hasIssueClosingKeywords(commit.body)
    )

    const closedIssues: IntermediateClosedIssues = {}
    const initDataIfNotExists = (issueNumber: number) => {
        if (!closedIssues[issueNumber])
            closedIssues[issueNumber] = { closedBy: { commits: [], pullRequests: [] } }
    }

    // Fetch all pull-requests from Github.
    const prNumbers = prMerges.map((commit) => getPRNumber(commit.title)!)
    const mergedPullRequests: PullRequestData[] = await Promise.all(
        prNumbers.map(getPullRequestData)
    )

    // Fetch all usernames from Github.
    const addingUserNamePromise = issueClosingCommits.map(async (commit) => ({
        ...commit,
        authorUserName: await memoGetUserName(commit),
    }))
    const issueClosingCommitsWUserName: ScrappedCommitDataWUserName[] = await Promise.all(
        addingUserNamePromise
    )

    // Group the merged PRs by closed-issue number.
    for (const pr of mergedPullRequests) {
        for (const issueNumber of getIssuesClosedByPR(pr)) {
            initDataIfNotExists(issueNumber)
            closedIssues[issueNumber].closedBy.pullRequests.push(pr)
        }
    }

    // Group the commits by closed-issue number.
    for (const commit of issueClosingCommitsWUserName) {
        for (const issueNumber of getClosedIssuesFromBodyText(commit.body)) {
            initDataIfNotExists(issueNumber)
            closedIssues[issueNumber].closedBy.commits.push(commit)
        }
    }

    const entries = Object.entries(closedIssues)
    const issueNumbers = entries.map((x) => parseInt(x[0]))

    // Fetch all issues from Github.
    const issues = await Promise.all(issueNumbers.map(getIssueData))

    // Insert fetched issue-data into each entry.
    entries.forEach(([_, data], i) => (data.issue = issues[i]))

    return {
        closedIssues: Object.values(closedIssues) as ClosedIssueData[],
        mergedPullRequests,
    }
}

const prMergeRegex = /^Merge pull request #([0-9]+) /
const isPullRequestMerge = (commitTitle: string) => prMergeRegex.test(commitTitle)
const getPRNumber = (commitTitle: string) => {
    const match = prMergeRegex.exec(commitTitle)
    if (!match) return null
    return parseInt(match[1])
}

const getIssuesClosedByPR = (pullRequest: PullRequestData) => {
    const hasNoBody = pullRequest.body === null
    if (hasNoBody) return []

    return getClosedIssuesFromBodyText(pullRequest.body!)
}
