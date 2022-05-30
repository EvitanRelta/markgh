import TurndownService from 'turndown'
import { codeBlocks, quillAlign, resizedImage, strikethrough, underline } from './turndownPlugins'


function preProcessHtml(element: Element) {
    const isCodeOrCodeBlock = (element: Element) => ['CODE', 'PRE'].includes(element.tagName)
    const isEditorContainer = (element: Element) => element.classList.contains('ql-editor')
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
            .replaceAll('\xa0', '&nbsp;')
            .replace(/(?<!\\)<(?=\/?[a-z])/gi, '&lt;')
    }

    if (!isInsideCodeOrCodeBlock(element)) {
        Array.from(element.childNodes)
            .filter(isTextNode)
            .forEach(escapeAmpersand)
    }

    Array.from(element.children)
        .forEach(preProcessHtml)
}

function postProcessHtml(markdown: string) {
    return markdown
        .replaceAll('&lt;', '\\<')
        .replaceAll('&amp;', '\\&')
        .replace(/(?<=&nbsp;)&nbsp;/g, ' ')
        .replace(/(?<!\s|\\)&nbsp;(?!\s)/g, ' ')
}

export default (html: HTMLElement) => {
    const htmlCopy = html.cloneNode(true) as HTMLElement
    preProcessHtml(htmlCopy)

    const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced'
    }).use([codeBlocks, underline, quillAlign, strikethrough, resizedImage])

    const markdown = turndownService.turndown(htmlCopy)
    return postProcessHtml(markdown)
}