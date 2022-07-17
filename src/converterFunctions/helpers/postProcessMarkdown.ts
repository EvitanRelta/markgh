const replaceOnlyNonCodeOrCodeBlock = (
    markdown: string,
    replacementFn: (markdown: string) => string
) => {
    const separateCodeRegex = /(.*?)(`[^`]+`|$)/gs
    const separateCodeBlocksRegex = /(.*?)((`{3,}).+?\3|(?<!\\)<pre(?!\w)[^>]*>.*?<\/pre>|$)/gs
    const processOnlyNonCode = (wholeMatch: string, nonCode = '', code = '') =>
        replacementFn(nonCode) + code
    const processOnlyNonCodeOrCodeBlock = (
        wholeMatch: string,
        nonCodeBlock = '',
        codeBlock = ''
    ) => {
        return nonCodeBlock.replace(separateCodeRegex, processOnlyNonCode) + codeBlock
    }
    return markdown.replace(separateCodeBlocksRegex, processOnlyNonCodeOrCodeBlock)
}

export const postProcessMarkdown = (markdown: string) => {
    type StrReplacement = (str: string) => string

    // eg. '[TEXT] &nbsp; [TEXT]' -> '[TEXT]   [TEXT]'
    const allToSpaces: StrReplacement = (x) => x.replaceAll('&nbsp;', ' ')

    // eg. '[TEXT]   [TEXT]' -> '[TEXT]&nbsp;  [TEXT]'
    // (3rd space isn't replaced as it's not a double)
    const escapeDoubleSpace: StrReplacement = (x) => x.replaceAll('  ', '&nbsp; ')

    // eg. '[TEXT]&nbsp;  [TEXT]' -> '[TEXT]&nbsp; &nbsp;[TEXT]'
    const escapeLeadingTrailingSpaces: StrReplacement = (x) =>
        x.replaceAll(/^ | $|(?<=\s) (?=\S)/g, '&nbsp;')

    // eg. '[TEXT]&nbsp; &nbsp; &nbsp;[TEXT]' -> '[TEXT] &nbsp; &nbsp; [TEXT]'
    const reduceOddNumOfNbsp: StrReplacement = (x) =>
        x.replace(/(?<!\s|^)((&nbsp; )+)&nbsp;(?!\s|$)/gm, ' $1')

    // For better readability.
    // eg. '[TEXT]&nbsp; &nbsp; [TEXT]' -> '[TEXT] &nbsp;&nbsp; [TEXT]'
    const avoidNbspBesideWords: StrReplacement = (x) =>
        x.replace(/(?<!\s|^)&nbsp; &nbsp; ((&nbsp; )*)(?!$)/gm, ' &nbsp;&nbsp; $1')

    // '&lt;&amp;' -> '\<\&'
    const htmlEscapeToBackslashEscape: StrReplacement = (x) =>
        x.replaceAll('&lt;', '\\<').replaceAll('&amp;', '\\&')

    const postProcess: StrReplacement = (markdown) =>
        [
            allToSpaces,
            escapeDoubleSpace,
            escapeLeadingTrailingSpaces,
            reduceOddNumOfNbsp,
            avoidNbspBesideWords,
            htmlEscapeToBackslashEscape,
        ].reduce((str, fn) => fn(str), markdown)

    return replaceOnlyNonCodeOrCodeBlock(markdown, postProcess)
}
