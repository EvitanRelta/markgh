import { getTestPairHOF } from '../../helpers/getTestPair'
import { initMdConversionEmulator } from '../../helpers/initMdConversionEmulator'

const getTestPair = getTestPairHOF(__dirname)
const emulateMarkdownConversion = initMdConversionEmulator()

test('(HTML -> Markdown) Linebreak - empty', async () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./empty')
    const outputMarkdown = await emulateMarkdownConversion(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('(HTML -> Markdown) Linebreak - only linebreaks', async () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./onlyLinebreaks')
    const outputMarkdown = await emulateMarkdownConversion(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('(HTML -> Markdown) Linebreak - with text', async () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./withText')
    const outputMarkdown = await emulateMarkdownConversion(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})
