import { approxSpaceData, Data } from './approxSpaceData'

const getIndexByBinarySearch = (
    value: number,
    start: number = 0,
    end: number = approxSpaceData.length - 1
): number => {
    if (start >= end) return start
    let mid = Math.floor((start + end) / 2)
    const currentValue = approxSpaceData[mid][0]
    if (currentValue === value) return mid
    if (currentValue > value) return getIndexByBinarySearch(value, start, mid - 1)
    return getIndexByBinarySearch(value, mid + 1, end)
}

const getClosestFromIndex = (index: number, targetValue: number) => {
    const approxRange = approxSpaceData.slice(
        index === 0 ? 0 : index - 1,
        index === approxSpaceData.length - 1 ? index + 1 : index + 2
    )

    const getClosest = (acc: Data, x: Data) =>
        Math.abs(targetValue - x[0]) < Math.abs(targetValue - acc[0]) ? x : acc
    return approxRange.reduce(getClosest)
}

export const getClosestData = (targetValue: number) => {
    const index = getIndexByBinarySearch(targetValue)
    return getClosestFromIndex(index, targetValue)
}
