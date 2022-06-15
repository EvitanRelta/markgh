const isCodeOrCodeBlock = (element: Element) => ['CODE', 'PRE'].includes(element.tagName)
const isEditorContainer = (element: Element) => element.classList.contains('markdown-body')
const isInsideCodeOrCodeBlock = (element: Element): boolean => {
    if (isEditorContainer(element)) return false
    if (isCodeOrCodeBlock(element)) return true
    if (element.parentElement === null) return false

    return isInsideCodeOrCodeBlock(element.parentElement)
}
const isTextNode = (node: Node) => node.nodeType === node.TEXT_NODE

const recursivelyEscape = (element: Element) => {
    const escapeCharacters = (node: Node) => {
        if (!node.nodeValue) return
        node.nodeValue = node.nodeValue
            .replace(/(?<!\\)&(?=\S+;)/gi, '&amp;')
            .replaceAll('\xa0', ' ')
            .replaceAll('  ', '&nbsp; ')
            .replace(/^ | $|(?<=\s) (?=\S)/g, '&nbsp;')
            .replace(/(?<!\\)<(?=\/?[a-z])/gi, '&lt;')
    }

    if (!isInsideCodeOrCodeBlock(element)) {
        Array.from(element.childNodes).filter(isTextNode).forEach(escapeCharacters)
    }

    Array.from(element.children).forEach(recursivelyEscape)
}

export default (htmlElement: Element) => {
    recursivelyEscape(htmlElement)
}
