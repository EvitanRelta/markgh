import TurndownService from 'turndown'
import {
    align,
    codeBlocks,
    ignoreTipTapArtifacts,
    resizedImage,
    strikethrough,
    underline,
} from './turndownPlugins'
import noListItemSpacing from './turndownPlugins/noListItemSpacing'

function preProcessHtml(element: Element) {
    const isCodeOrCodeBlock = (element: Element) =>
        ['CODE', 'PRE'].includes(element.tagName)
    const isEditorContainer = (element: Element) =>
        element.classList.contains('markdown-body')
    const isInsideCodeOrCodeBlock = (element: Element): boolean => {
        if (isEditorContainer(element)) return false
        if (isCodeOrCodeBlock(element)) return true
        if (element.parentElement === null) return false

        return isInsideCodeOrCodeBlock(element.parentElement)
    }

    const isTextNode = (node: Node) => node.nodeType === node.TEXT_NODE
    const escapeAmpersand = (node: Node) => {
        if (!node.nodeValue) return
        node.nodeValue = node.nodeValue
            .replace(/(?<!\\)&(?=\S+;)/gi, '&amp;')
            .replaceAll('\xa0', ' ')
            .replaceAll('  ', '&nbsp; ')
            .replace(/^ | $|(?<=\s) (?=\S)/g, '&nbsp;')
            .replace(/(?<!\\)<(?=\/?[a-z])/gi, '&lt;')
    }

    if (!isInsideCodeOrCodeBlock(element)) {
        Array.from(element.childNodes)
            .filter(isTextNode)
            .forEach(escapeAmpersand)
    }

    Array.from(element.children).forEach(preProcessHtml)
}

function replaceOnlyNonCodeOrCodeBlock(
    markdown: string,
    replacementFn: (markdown: string) => string
) {
    const separateCodeRegex = /(.*?)(`[^`]+`|$)/gs
    const separateCodeBlocksRegex =
        /(.*?)((`{3,}).+?\3|(?<!\\)<pre(?!\w)[^>]*>.*?<\/pre>|$)/gs
    const processOnlyNonCode = (wholeMatch: string, nonCode = '', code = '') =>
        replacementFn(nonCode) + code
    const processOnlyNonCodeOrCodeBlock = (
        wholeMatch: string,
        nonCodeBlock = '',
        codeBlock = ''
    ) => {
        return (
            nonCodeBlock.replace(separateCodeRegex, processOnlyNonCode) +
            codeBlock
        )
    }
    return markdown.replace(
        separateCodeBlocksRegex,
        processOnlyNonCodeOrCodeBlock
    )
}

function postProcessHtml(markdown: string) {
    type StrReplacement = (str: string) => string

    // Assumes that there's no more than 2 '&nbsp;' in a row.
    // eg. '[TEXT]&nbsp;&nbsp;[TEXT]' -> '[TEXT]&nbsp; [TEXT]'
    const unescapeDoubleNbsp: StrReplacement = (x) =>
        x.replace(/(?<=&nbsp;)&nbsp;(?!$)/gm, ' ')

    // eg. '[TEXT]&nbsp;[TEXT]' -> '[TEXT] [TEXT]'
    const unescapeUnnecessaryNbsp: StrReplacement = (x) =>
        x.replace(/(?<!\s|^)&nbsp;(?!\s|$)/gm, ' ')

    // eg. '[TEXT]&nbsp; &nbsp; &nbsp;[TEXT]' -> '[TEXT] &nbsp; &nbsp; [TEXT]'
    const reduceOddNumOfNbsp: StrReplacement = (x) =>
        x.replace(/(?<!\s|^)((&nbsp; )+)&nbsp;(?!\s|$)/gm, ' $1')

    // For better readability.
    // eg. '[TEXT]&nbsp; &nbsp; [TEXT]' -> '[TEXT] &nbsp;&nbsp; [TEXT]'
    const avoidNbspBesideWords: StrReplacement = (x) =>
        x.replace(
            /(?<!\s|^)&nbsp; &nbsp; ((&nbsp; )*)(?!$)/gm,
            ' &nbsp;&nbsp; $1'
        )

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

export default (html: HTMLElement) => {
    const htmlCopy = html.cloneNode(true) as HTMLElement
    preProcessHtml(htmlCopy)

    const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced',
    }).use([
        codeBlocks,
        underline,
        align,
        strikethrough,
        resizedImage,
        ignoreTipTapArtifacts,
        noListItemSpacing,
    ])

    const markdown = turndownService.turndown(htmlCopy)
    return postProcessHtml(markdown)
}
