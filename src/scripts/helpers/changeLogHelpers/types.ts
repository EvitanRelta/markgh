import { getCommitData, getIssueData, getPullRequestData } from './githubDataGetters'

// Types of data obtained from Github.
export type IssueData = Awaited<ReturnType<typeof getIssueData>>
export type PullRequestData = Awaited<ReturnType<typeof getPullRequestData>>
export type CommitData = Awaited<ReturnType<typeof getCommitData>>

// Commit data scrapped locally from Git log.
export interface ScrappedCommitData {
    commitHash: string
    abbrevCommitHash: string
    authorName: string
    authorEmail: string
    authorDate: Date
    title: string
    body: string
}

// Scrapped data, augmented with Github username.
export interface ScrappedCommitDataWUserName extends ScrappedCommitData {
    authorUserName: string
}

// Parsed data, of an issue and the commits/PRs that closes it.
export interface ClosedIssueData {
    issue: IssueData
    closedBy: {
        commits: ScrappedCommitDataWUserName[]
        pullRequests: PullRequestData[]
    }
}

// Parsed data, of all the issues closed (and the commits/PRs that closes it),
// and PRs merged between 2 tags.
// For generating changelogs.
export interface TagChanges {
    tag: string
    previousTag: string
    closedIssues: ClosedIssueData[]
    mergedPullRequests: PullRequestData[]
}
