import { approxSpace } from './approxSpace'
import { getTextWidth } from './getTextWidth'

// Github's tab width = 35.07
// Our site tab width = 34.16
// List item indent   = 32
const approxTabFromPrefix = (prefix: string, consecutiveTabs: number, tabWidth = 32) => {
    const prefixWidth = getTextWidth(prefix)
    let spaceWidth = tabWidth - (prefixWidth % tabWidth)
    if (spaceWidth < 2) spaceWidth += tabWidth
    spaceWidth += (consecutiveTabs - 1) * tabWidth

    return approxSpace(spaceWidth)
}

const hasTabs = (text: string) => /\t/.test(text)
export const replaceTabsWApproxSpaces = (text: string): string => {
    if (!hasTabs(text)) return text

    return replaceTabsWApproxSpaces(
        text.replace(/(?<=^(.*))\t+/, (tabs, prefix) => {
            const numOfTabs = tabs.length
            return approxTabFromPrefix(prefix, numOfTabs)
        })
    )
}
