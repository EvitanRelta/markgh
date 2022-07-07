import { RequestError } from '@octokit/request-error'
import { Octokit } from '@octokit/rest'
import { memoize } from 'lodash'
import { repoName, repoOwner } from './config.json'

const octokit = new Octokit()

// Thrown when a given issue number doesn't exists on the repo.
export class NonExistentGHIssueError extends Error {
    constructor(issueNumber: number) {
        super(`Github issue #${issueNumber} doesn't exist on repo "${repoOwner}/${repoName}".`)
    }
}

// Throw when a given PR number doesn't exists on the repo.
export class NonExistentGHPullRequestError extends Error {
    constructor(prNumber: number) {
        super(`Github pull request #${prNumber} doesn't exist on repo "${repoOwner}/${repoName}".`)
    }
}

// Throw when a given commit hash doesn't exists on the repo.
export class NonExistentGHCommitError extends Error {
    constructor(commitHash: string) {
        super(`Github commit ${commitHash} doesn't exist on repo "${repoOwner}/${repoName}".`)
    }
}

export const getIssueData = async (issueNumber: number) => {
    try {
        const res = await octokit.rest.issues.get({
            owner: repoOwner,
            repo: repoName,
            issue_number: issueNumber,
        })
        return res.data
    } catch (e) {
        // Issue doesn't exist.
        if (e instanceof RequestError && e.status === 404)
            throw new NonExistentGHIssueError(issueNumber)
        throw e
    }
}

export const getPullRequestData = async (prNumber: number) => {
    try {
        const res = await octokit.rest.pulls.get({
            owner: repoOwner,
            repo: repoName,
            pull_number: prNumber,
        })
        return res.data
    } catch (e) {
        // PR doesn't exist.
        if (e instanceof RequestError && e.status === 404)
            throw new NonExistentGHPullRequestError(prNumber)
        throw e
    }
}

export const getCommitData = async (commitHash: string) => {
    try {
        const res = await octokit.rest.repos.getCommit({
            owner: repoOwner,
            repo: repoName,
            ref: commitHash,
        })
        return res.data
    } catch (e) {
        // Commit doesn't exist
        if (e instanceof RequestError && e.status === 404)
            throw new NonExistentGHCommitError(commitHash)
        throw e
    }
}

export const memoGetIssueData = memoize(getIssueData)
export const memoGetCommitData = memoize(getCommitData)
export const memoGetPullRequestData = memoize(getPullRequestData)

export type IssueData = Awaited<ReturnType<typeof getIssueData>>
export type PullRequestData = Awaited<ReturnType<typeof getPullRequestData>>
export type CommitData = Awaited<ReturnType<typeof getCommitData>>
