import { markdownToHtml } from '../../../converterFunctions'
import { getTestPairHOF } from '../../helpers/getTestPair'
import { initMdConversionEmulator } from '../../helpers/initMdConversionEmulator'

const getTestPair = getTestPairHOF(__dirname)
const emulateMarkdownConversion = initMdConversionEmulator()

test('(HTML -> Markdown) Align', async () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./HTM')
    const outputMarkdown = await emulateMarkdownConversion(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('(Markdown -> Markdown) Align', async () => {
    const [markdownInput, expectedMarkdownOutput] = getTestPair('./MTM')
    const convertedHtml = markdownToHtml(markdownInput)
    const outputMarkdown = await emulateMarkdownConversion(convertedHtml)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})
