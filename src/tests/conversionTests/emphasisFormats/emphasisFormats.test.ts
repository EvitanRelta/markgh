import { markdownToHtml } from '../../../converterFunctions'
import { getTestPairHOF } from '../../helpers/getTestPair'
import { initMdConversionEmulator } from '../../helpers/initMdConversionEmulator'

const getTestPair = getTestPairHOF(__dirname)
const emulateMarkdownConversion = initMdConversionEmulator()

test('(HTML -> Markdown) Emphasis - simple', async () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./simple')
    const outputMarkdown = await emulateMarkdownConversion(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('(Markdown -> Markdown) Emphasis - simple', async () => {
    const [markdownInput, expectedMarkdownOutput] = getTestPair('./simpleMTM')
    const convertedHtml = markdownToHtml(markdownInput)
    const outputMarkdown = await emulateMarkdownConversion(convertedHtml)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('(HTML -> Markdown) Emphasis - leading/trailing spaces', async () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./leadingTrailingSpaces')
    const outputMarkdown = await emulateMarkdownConversion(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

// test('HTML-to-Markdown Formatting: emphasis - mixed formattings', async () => {
//     const [htmlInput, expectedMarkdownOutput] = getTestPair('./mixed')
//     const outputMarkdown = await emulateMarkdownConversion(htmlInput)
//     expect(outputMarkdown).toBe(expectedMarkdownOutput)
// })
