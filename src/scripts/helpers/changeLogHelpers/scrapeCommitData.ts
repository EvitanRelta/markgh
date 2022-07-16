import { getCommandOutput } from '../shellHelpers'
import type { ScrappedCommitData } from './types'

// Scrapes local commit data from Git log.
export const scrapeCommitData = (
    fromCommitHash: string, // older commit
    toCommitHash: string, // more recent commit
    includeFromCommit: boolean,
    includeToCommit: boolean
): ScrappedCommitData[] => {
    const commitRange =
        fromCommitHash +
        (includeFromCommit ? '~' : '') +
        '..' +
        toCommitHash +
        (includeToCommit ? '' : '~')
    const rawCommitLog = getCommandOutput(
        `git log --pretty=format:"\x1f%H\x1f%h\x1f%an\x1f%ae\x1f%aI\x1f%s\x1f%b" ${commitRange}`
    )
    const rawCommitArr = Array.from(
        rawCommitLog.matchAll(/(?<=^|\n)\x1f([^\x1f]*(\x1f[^\x1f]*){6})(?=$|\n)/g)
    ).map((x) => x[1])

    return rawCommitArr.map((rawCommitStr) => {
        const [commitHash, abbrevCommitHash, authorName, authorEmail, authorDateISO, title, body] =
            rawCommitStr.split('\x1f')
        return {
            commitHash,
            abbrevCommitHash,
            authorName,
            authorEmail,
            authorDate: new Date(authorDateISO),
            title,
            body,
        }
    })
}
