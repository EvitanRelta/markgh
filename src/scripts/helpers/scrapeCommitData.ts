import { getCommandOutput } from './shellHelperFunctions'

export interface ScrappedCommitData {
    commitHash: string
    abbrevCommitHash: string
    authorName: string
    authorEmail: string
    authorDate: Date
    title: string
    body: string
}

export const scrapeCommitData = (
    exclusiveFromCommitHash: string, // older commit
    inclusiveToCommitHash: string // more recent commit
): ScrappedCommitData[] => {
    const rawCommitLog = getCommandOutput(
        `git log --pretty=format:"\x1f%H\x1f%h\x1f%an\x1f%ae\x1f%aI\x1f%s\x1f%b" ${exclusiveFromCommitHash}~..${inclusiveToCommitHash}`
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
