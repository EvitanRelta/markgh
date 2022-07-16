import { sh } from './initShellJs'
import { getCommandOutput } from './shellHelpers'

// Tags
export const getLatestTag = () => getCommandOutput('git describe --abbrev=0')
export const getPreviousTag = (tag: string) => getCommandOutput(`git describe --abbrev=0 "${tag}^"`)

// Commit Hashs
export const getCommitHash = (ref: string) => getCommandOutput(`git rev-list -n 1 "${ref}"`)
export const getCommitHashFromTag = (tag: string) => getCommitHash(`tags/${tag}`)
export const getCommitHashOfBranch = (branchName: string) => getCommitHash(`heads/${branchName}`)
export const getCommitHashOfRemoteBranch = (branchName: string) =>
    getCommitHash(`remotes/${branchName}`)
export const branchExists = (branchName: string) =>
    getCommandOutput(`git branch --list ${branchName}`) !== ''

// Branches
export const getCurrentBranch = () => getCommandOutput('git rev-parse --abbrev-ref HEAD')
export const getTrackedBranch = (branchName: string) =>
    getCommandOutput(`git for-each-ref --format="%(upstream:short)" "refs/heads/${branchName}"`)

// Misc.
export const hasUncommitedChanges = () => getCommandOutput('git status --porcelain') !== ''
export const getRemoteUrl = (remoteName: string) =>
    getCommandOutput(`git remote get-url ${remoteName}`)
export const isUpToDate = (branchName: string) => {
    sh.exec('git fetch')
    const trackedBranch = getTrackedBranch(branchName)
    const isNotTrackingBranch = trackedBranch === ''
    if (isNotTrackingBranch)
        throw new Error(`Branch "${branchName}" is not tracking any upstream branch.`)

    const localBranchHead = getCommitHashOfBranch(branchName)
    const upstreamBranchHead = getCommitHashOfRemoteBranch(trackedBranch)
    return localBranchHead === upstreamBranchHead
}
