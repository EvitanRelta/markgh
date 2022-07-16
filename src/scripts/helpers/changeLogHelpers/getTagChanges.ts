import { SetOptional } from 'type-fest'
import { getCommitHashFromTag, getPreviousTag } from '../gitHelpers'
import { logMsg } from '../shellHelpers'
import { memoGetUserName } from './getUserName'
import { getIssueData, getPullRequestData } from './githubDataGetters'
import { getClosedIssuesFromBodyText, hasIssueClosingKeywords } from './issueClosingKeywordParsers'
import { scrapeCommitData } from './scrapeCommitData'
import type { ClosedIssueData, PullRequestData, TagChanges } from './types'

type IssueNumber = number
type IntermediateClosedIssues = Record<IssueNumber, SetOptional<ClosedIssueData, 'issue'>>

const prMergeRegex = /^Merge pull request #([0-9]+) /
const isPullRequestMerge = (commitTitle: string) => prMergeRegex.test(commitTitle)
const getPRNumber = (commitTitle: string) => {
    const match = prMergeRegex.exec(commitTitle)
    if (!match) return null
    return parseInt(match[1])
}
const getIssuesClosedByPR = (pr: PullRequestData) => {
    const prDoesntHaveBody = pr.body === null
    if (prDoesntHaveBody) return []

    return getClosedIssuesFromBodyText(pr.body!)
}

export const getTagChanges = async (tag: string): Promise<TagChanges> => {
    logMsg('Scrapping local commits from Git...')
    const previousTag = getPreviousTag(tag)

    const taggedCommit = getCommitHashFromTag(tag)
    const previousTaggedCommit = getCommitHashFromTag(previousTag)
    const scrappedCommits = scrapeCommitData(previousTaggedCommit, taggedCommit, false, true)

    const prMerges = scrappedCommits.filter((commit) => isPullRequestMerge(commit.title))
    const issueClosingCommits = scrappedCommits.filter((commit) =>
        hasIssueClosingKeywords(commit.body)
    )

    const closedIssues: IntermediateClosedIssues = {}

    logMsg('Getting PRs...')
    const mergedPullRequests = await Promise.all(
        prMerges.map((commit) => getPRNumber(commit.title)!).map(getPullRequestData)
    )

    const initDataIfNotExists = (issueNumber: number) => {
        if (!closedIssues[issueNumber])
            closedIssues[issueNumber] = {
                closedBy: { commits: [], pullRequests: [] },
            }
    }
    for (const pr of mergedPullRequests) {
        for (const issueNumber of getIssuesClosedByPR(pr)) {
            initDataIfNotExists(issueNumber)
            closedIssues[issueNumber].closedBy.pullRequests.push(pr)
        }
    }

    logMsg('Getting Commits/Usernames...')
    for (const commit of issueClosingCommits) {
        const authorUserName = await memoGetUserName(commit)
        for (const issueNumber of getClosedIssuesFromBodyText(commit.body)) {
            initDataIfNotExists(issueNumber)
            closedIssues[issueNumber].closedBy.commits.push({
                ...commit,
                authorUserName,
            })
        }
    }

    const entries = Object.entries(closedIssues)
    const issueNumbers = entries.map((x) => parseInt(x[0]))

    // Gets all issue data together asynchronously.
    logMsg('Getting Issues...')
    const issues = await Promise.all(issueNumbers.map(getIssueData))
    entries.forEach(([_, data], i) => (data.issue = issues[i]))

    return {
        tag,
        previousTag,
        closedIssues: Object.values(closedIssues) as ClosedIssueData[],
        mergedPullRequests,
    }
}
