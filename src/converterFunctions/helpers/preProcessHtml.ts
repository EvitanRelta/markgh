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

export const removeCodeBlockWrapper = (htmlElement: Element) => {
    const removeInnerWrapper = (preElement: Element) => {
        const codeElement = preElement.firstElementChild
        const innerDivElement = codeElement?.firstElementChild
        if (!codeElement || !innerDivElement) throw new Error('Error parsing codeblock.')

        codeElement.removeChild(innerDivElement)
        codeElement.append(...Array.from(innerDivElement.childNodes))
    }

    htmlElement.querySelectorAll('.react-renderer.node-codeBlock').forEach((wrapper) => {
        const parentElement = wrapper.parentElement
        const preElement = wrapper.querySelector('pre')
        if (!parentElement || !preElement) throw new Error('Error parsing codeblock.')

        parentElement.replaceChild(preElement, wrapper)
        removeInnerWrapper(preElement)
    })
}

export const removeImageWrapper = (htmlElement: Element) => {
    htmlElement.querySelectorAll('.react-renderer.node-image').forEach((wrapper) => {
        const parentElement = wrapper.parentElement
        const imgElement = wrapper.querySelector('img')
        if (!parentElement || !imgElement) throw new Error('Error parsing codeblock.')

        parentElement.replaceChild(imgElement, wrapper)
    })
}

export const removeWrapperParagraphs = (htmlElement: Element) => {
    htmlElement.querySelectorAll('li > p').forEach((wrapper) => {
        const parentElement = wrapper.parentElement
        if (!parentElement) throw new Error('Error parsing codeblock.')

        parentElement.removeChild(wrapper)
        parentElement.append(...Array.from(wrapper.childNodes))
    })
}

export const preProcessHtml = (htmlElement: Element) => {
    recursivelyEscape(htmlElement)
    removeCodeBlockWrapper(htmlElement)
    removeImageWrapper(htmlElement)
    removeWrapperParagraphs(htmlElement)
}
