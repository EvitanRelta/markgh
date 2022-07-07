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
const issueClosingRegexStr = `\\b(${closingKeywords.join('|')}) #([0-9]+)\\b`

export const hasIssueClosingKeywords = (bodyText: string) =>
    new RegExp(issueClosingRegexStr, 'i').test(bodyText)

export const getClosedIssuesFromBodyText = (bodyText: string) =>
    Array.from(bodyText.matchAll(new RegExp(issueClosingRegexStr, 'gi'))).map((match) =>
        parseInt(match[2])
    )
