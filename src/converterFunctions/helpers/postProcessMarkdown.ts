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

export default (markdown: string) => {
    type StrReplacement = (str: string) => string

    // Assumes that there's no more than 2 '&nbsp;' in a row.
    // eg. '[TEXT]&nbsp;&nbsp;[TEXT]' -> '[TEXT]&nbsp; [TEXT]'
    const unescapeDoubleNbsp: StrReplacement = (x) => x.replace(/(?<=&nbsp;)&nbsp;(?!$)/gm, ' ')

    // eg. '[TEXT]&nbsp;[TEXT]' -> '[TEXT] [TEXT]'
    const unescapeUnnecessaryNbsp: StrReplacement = (x) =>
        x.replace(/(?<!\s|^)&nbsp;(?!\s|$)/gm, ' ')

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
            unescapeDoubleNbsp,
            unescapeUnnecessaryNbsp,
            reduceOddNumOfNbsp,
            avoidNbspBesideWords,
            htmlEscapeToBackslashEscape,
        ].reduce((str, fn) => fn(str), markdown)

    return replaceOnlyNonCodeOrCodeBlock(markdown, postProcess)
}
