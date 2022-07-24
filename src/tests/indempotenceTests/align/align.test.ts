import { markdownToHtml } from '../../../converterFunctions'
import { getTestPairHOF } from '../../helpers/getTestPair'
import { initMdConversionEmulator } from '../../helpers/initMdConversionEmulator'

const getTestPair = getTestPairHOF(__dirname)
const emulateMarkdownConversion = initMdConversionEmulator()

test('(Lossless Conv.) Align', async () => {
    const [markdownInput, expectedMarkdownOutput] = getTestPair('./align')
    const convertedHtml = markdownToHtml(markdownInput)
    const outputMarkdown = await emulateMarkdownConversion(convertedHtml)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})
