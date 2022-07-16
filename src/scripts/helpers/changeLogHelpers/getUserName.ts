import { memoize } from 'lodash'
import { getCommitData } from './githubDataGetters'
import { ScrappedCommitData } from './scrapeCommitData'

const getUserNameFromCommit = async (commitHash: string) => {
    const commit = await getCommitData(commitHash)
    return commit.author!.login
}

// Github allow users to set their email as private.
// The email used will instead be like: 35413456+USERNAME@users.noreply.github.com
const githubPrivateEmailRegex = /^[0-9]+\+([a-z-]+)@users.noreply.github.com$/i

const isPrivateEmail = (email: string) => githubPrivateEmailRegex.test(email)

const getUserNameFromPrivateEmail = (privateEmail: string) =>
    githubPrivateEmailRegex.exec(privateEmail)![1]

export const getUserName = async (commitData: ScrappedCommitData) => {
    const { commitHash, authorEmail } = commitData

    if (isPrivateEmail(authorEmail)) return getUserNameFromPrivateEmail(authorEmail)
    return await getUserNameFromCommit(commitHash)
}

export const memoGetUserName = memoize(getUserName, (commitData) => commitData.authorEmail)
