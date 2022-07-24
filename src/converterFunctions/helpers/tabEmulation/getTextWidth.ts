const font =
    '400 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'
const context = document.createElement('canvas').getContext('2d')!
context.font = font

export const getTextWidth = (text: string) => {
    const { width } = context.measureText(text)
    return width
}
