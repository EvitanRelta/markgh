const closingKeywords = [
    'close',
    'closes',
    'closed',
    'fix',
    'fixes',
    'fixed',
    'resolve',
    'resolves',
    'resolved',
]
const issueClosingRegex = new RegExp(
    `\\b(${closingKeywords.join('|')}) ([a-z0-9][a-z0-9-]*/[a-z0-9-_.]+)?#([0-9]+)\\b`
)

export const hasIssueClosingKeywords = (bodyText: string) =>
    new RegExp(issueClosingRegex, 'i').test(bodyText)

export const getClosedIssuesFromBodyText = (bodyText: string) => {
    const matches = Array.from(bodyText.matchAll(new RegExp(issueClosingRegex, 'gi')))
    const issueNumbersClosed = matches.map((match) => parseInt(match[3]))
    return issueNumbersClosed
}
