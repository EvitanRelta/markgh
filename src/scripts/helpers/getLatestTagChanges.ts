import { getClosedIssuesFromBodyText, hasIssueClosingKeywords } from './getClosedIssuesFromBodyText'
import { getIssueData, getPullRequestData, IssueData, PullRequestData } from './getGithubData'
import { memoGetUserName } from './getUserName'
import { scrapeCommitData, ScrappedCommitData } from './scrapeCommitData'
import { getCommandOutput, logMsg } from './shellHelperFunctions'

type IssueNumber = number
export interface ScrappedCommitDataWUserName extends ScrappedCommitData {
    authorUserName: string
}
export interface ClosedIssueData {
    issue?: IssueData
    closedBy: {
        commits: ScrappedCommitDataWUserName[]
        pullRequests: PullRequestData[]
    }
}
type ClosedIssues = Record<IssueNumber, ClosedIssueData>

export interface LatestTagChanges {
    latestTag: string
    previousTag: string
    closedIssues: ClosedIssues
    mergedPullRequests: PullRequestData[]
}

const getLatestTag = () => getCommandOutput('git describe --abbrev=0')
const getPreviousTag = (tag: string) => getCommandOutput(`git describe --abbrev=0 "${tag}^"`)
const getCommitHashFromTag = (tag: string) => getCommandOutput(`git rev-list -n 1 "tags/${tag}"`)

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

export const getLatestTagChanges = async (): Promise<LatestTagChanges> => {
    logMsg('Scrapping local commits from Git...')
    const latestTag = getLatestTag()
    const previousTag = getPreviousTag(latestTag)

    const latestTaggedCommit = getCommitHashFromTag(latestTag)
    const previousTaggedCommit = getCommitHashFromTag(previousTag)
    const scrappedCommits = scrapeCommitData(previousTaggedCommit, latestTaggedCommit)

    const prMerges = scrappedCommits.filter((commit) => isPullRequestMerge(commit.title))
    const issueClosingCommits = scrappedCommits.filter((commit) =>
        hasIssueClosingKeywords(commit.body)
    )

    const closedIssues: ClosedIssues = {}

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
        latestTag,
        previousTag,
        closedIssues: closedIssues,
        mergedPullRequests,
    }
}
