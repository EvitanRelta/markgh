import { getCommandOutput } from './shellHelpers'

export const getLatestTag = () => getCommandOutput('git describe --abbrev=0')
export const getPreviousTag = (tag: string) => getCommandOutput(`git describe --abbrev=0 "${tag}^"`)

export const getCommitHash = (ref: string) => getCommandOutput(`git rev-list -n 1 "${ref}"`)
export const getCommitHashFromTag = (tag: string) => getCommitHash(`tags/${tag}`)
