import { memoize } from 'lodash'
import { getCommitData } from './githubDataGetters'
import { ScrappedCommitData } from './scrapeCommitData'

// Github's PR merge commits' authors might be the user's Github name (instead of username).
// This attempts to get the actual Github username, to be referenced in Github's markdown when
// prefixed by '@' symbol (eg. @EvitanRelta)
export const getUserName = async (commitData: ScrappedCommitData) => {
    const { commitHash, authorEmail } = commitData

    if (isPrivateEmail(authorEmail)) return getUserNameFromPrivateEmail(authorEmail)
    return await getUserNameFromGithubCommit(commitHash)
}

export const memoGetUserName = memoize(getUserName, (commitData) => commitData.authorEmail)

// Gets username from the commit on Github.
const getUserNameFromGithubCommit = async (commitHash: string) => {
    const commit = await getCommitData(commitHash)
    return commit.author!.login
}

// Github allow users to set their email as private.
// The email used will instead be in the form: 35413456+USERNAME@users.noreply.github.com
// Hence, the username can be extracted from the email.
const githubPrivateEmailRegex = /^[0-9]+\+([a-z-]+)@users.noreply.github.com$/i
const isPrivateEmail = (email: string) => githubPrivateEmailRegex.test(email)
const getUserNameFromPrivateEmail = (privateEmail: string) =>
    githubPrivateEmailRegex.exec(privateEmail)![1]
