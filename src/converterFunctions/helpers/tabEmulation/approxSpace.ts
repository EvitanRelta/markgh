import { approxSpaceData, SpaceMultiples } from './approxSpaceData'
import { getClosestData } from './getClosestData'

// The 'approxSpaceData' data ranges from 0px, up to a certain max width.
// So this will trim 'width' down until it's within that range.
// It trims by removing in packets of em-spaces.
const splitExcessEmsp = (width: number, longestDataLen: number, emspWidth = 16) => {
    let emspSubtracted = 0
    while (width > longestDataLen) {
        width -= emspWidth
        emspSubtracted++
    }
    return [emspSubtracted, width]
}

const convertToSpaceChars = (spaceMultiple: SpaceMultiples) =>
    ['\u2003', '\u2002', '\u00A0', '\u2009', '\u200A']
        .map((spaceChar, i) => spaceChar.repeat(spaceMultiple[i]))
        .join('')

export const approxSpace = (spaceWidth: number) => {
    const longestDataLen = approxSpaceData[approxSpaceData.length - 1][0]
    const [emspExcess, fineTunedWidth] = splitExcessEmsp(spaceWidth, longestDataLen)

    const closestData = getClosestData(fineTunedWidth)

    const [emSpaces, ...rest] = closestData[1]
    const includeEmspExcess: SpaceMultiples = [emSpaces + emspExcess, ...rest]
    return convertToSpaceChars(includeEmspExcess)
}
