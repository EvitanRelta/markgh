// const spacesChar = {
//     emsp: '\u2003',
//     ensp: '\u2002',
//     nbsp: '\u00A0',
//     thinsp: '\u2009',
//     hairsp: '\u200A',
// }

import { writeToFile } from './helpers/writeToFile'

// Computed using the font used on Github, & 'getTextWidth' from:
// https://stackoverflow.com/a/21015393
const spaceWidths = {
    // Avoid computing combinations with emsp, as the number of possible
    // combinations for 5-spaces is much more than with 4-spaces, and is too
    // much for my PC to handle.
    // emsp: 16,
    ensp: 8,
    nbsp: 4.3828125,
    thinsp: 3.203125,
    hairsp: 2,
}

const widths = Object.values(spaceWidths)

// Limit computations to a widths <= maxWidth
const maxWidth = 64

// Get all combinations.
const getCombi = (variables: number, states: number): number[][] => {
    if (variables === 1) return Array.from(Array(states).keys()).map((x) => [x])
    const less1 = getCombi(variables - 1, states)

    return less1.map((rest) => Array.from(Array(states).keys()).map((x) => [...rest, x])).flat()
}

type TotalWidth = number
type NumOfEmSpaces = number
type NumOfEnSpaces = number
type NumOfNbSpaces = number
type NumOfThinSpaces = number
type NumOfHairSpaces = number

type SpaceMultiplesWOEmsp = [NumOfEnSpaces, NumOfNbSpaces, NumOfThinSpaces, NumOfHairSpaces]
type DataWOEmsp = [TotalWidth, SpaceMultiplesWOEmsp]

type SpaceMultiples = [
    NumOfEmSpaces,
    NumOfEnSpaces,
    NumOfNbSpaces,
    NumOfThinSpaces,
    NumOfHairSpaces
]
type Data = [TotalWidth, SpaceMultiples]

// Get all combintations between the 4 different spaces.
const dataArr = getCombi(4, Math.ceil(maxWidth / widths[widths.length - 1]))
    .map((multiples) => {
        const allWidths = multiples.map((multiple, i) => multiple * widths[i])
        const totalWidth = allWidths.reduce((totalWidth, x) => totalWidth + x, 0)
        return [totalWidth, multiples] as DataWOEmsp
    })
    .filter(([totalWidth]) => totalWidth <= maxWidth)
    // Sort by ascending total-width.
    .sort(([width1], [width2]) => width1 - width2)
    // Convert excess ensp to emsp. 2 ensp = 1 emsp
    .map(
        ([totalWidth, [ensp, ...rest]]) =>
            [totalWidth, [Math.floor(ensp / 2), Math.round(ensp % 2), ...rest]] as Data
    )

// Determine which combination has either a shorter string-length
// (ie. the length of the string after converting to "&emsp;" / "&ensp;" / etc.)
// or more large-spaces.
// (eg. 1 ensp is favored over 4 hairsp, as "&ensp;" is much shorter than
// "&hairsp;&hairsp;&hairsp;&hairsp;". Also, ensp is a larger space than hairsp)
const hasBiggerChar = (data1: Data, data2: Data) => {
    const strLen1 = getStrLen(data1)
    const strLen2 = getStrLen(data2)

    if (strLen1 < strLen2) return true
    if (strLen1 > strLen2) return false

    for (let i = 0; i < data1[1].length; i++) {
        const chars1 = data1[1][i]
        const chars2 = data2[1][i]
        if (chars1 > chars2) return true
        if (chars1 < chars2) return false
    }
    return true
}
const charStr = ['&emsp;', '&ensp;', '&nbsp;', '&thinsp;', '&hairsp']
const multiplesToStr = (multiples: SpaceMultiples) =>
    multiples.map((multiple, i) => charStr[i].repeat(multiple)).join('')
const getStrLen = (data: Data) => multiplesToStr(data[1]).length

// Remove same total-width-combinations, favoring the combination based on the
// 'hasBiggerChar' predicate.
let noSameWidth = [dataArr[0]]
for (let i = 1; i < dataArr.length; i++) {
    const data = dataArr[i]
    const previousData = noSameWidth[noSameWidth.length - 1]

    if (data[0] !== previousData[0]) {
        noSameWidth.push(data)
        continue
    }

    if (hasBiggerChar(data, previousData)) {
        noSameWidth[noSameWidth.length - 1] = data
    }
}

// Max difference in width between 2 data values.
const maxDiff = 0.1

// Reduce the number of data values, by removing those that are too close in
// width to the previous value.
// (ie. given the widths [1, 1.01, 1.1], the 1.01-width is removed as it's too
// close to 1, and is almost impossible to the diff in width by the naked eye)
let reduced = [noSameWidth[0]]
let lastI = 0
let lastLen = noSameWidth[0][0]
while (lastI < noSameWidth.length - 1) {
    // Get all the data values thats after the previous reduced-value,
    // thats within the maxDiff-range.
    const dataRange: { i: number; data: Data }[] = []
    for (let i = lastI + 1; i < noSameWidth.length; i++) {
        const data = noSameWidth[i]
        if (data[0] > lastLen + maxDiff) break
        dataRange.push({ i, data })
    }

    // If there's no values within the maxDiff-range, pick the next value
    // (which is the next-best combination)
    if (dataRange.length === 0) {
        const nextData = noSameWidth[lastI + 1]
        reduced.push(nextData)
        lastI++
        lastLen = nextData[0]
        continue
    }

    // Among the values in the maxDiff-range, pick the best one that's
    // determined by the 'hasBiggerChar' predicate.
    const { i, data: nextData } = dataRange.reduce((acc, x) =>
        hasBiggerChar(acc.data, x.data) ? acc : x
    )

    reduced.push(nextData)
    lastI = i
    lastLen = nextData[0]
}

writeToFile('approxSpaceData.json', JSON.stringify(reduced))

export {}
