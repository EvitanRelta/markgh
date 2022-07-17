import { removeTipTapArtifacts } from './removeTipTapArtifacts'

// Helper function for escaping characters.
const escapeTextNode = (textNode: Node) => {
    if (!textNode.nodeValue) return
    textNode.nodeValue = textNode.nodeValue
        .replace(/(?<!\\)&(?=\S+;)/gi, '&amp;')
        .replaceAll('\xa0', ' ')
        .replaceAll('  ', '&nbsp; ')
        .replace(/^ | $|(?<=\s) (?=\S)/g, '&nbsp;')
        .replace(/(?<!\\)<(?=\/?[a-z])/gi, '&lt;')
}

const escapeCharacters = (htmlElement: Element) => {
    const isTextNode = (node: Node) => node.nodeType === node.TEXT_NODE
    const elementsNotInCode = Array.from(htmlElement.querySelectorAll(':not(code,code *)'))
    const textNodesNotInCode = elementsNotInCode
        .map((element) => Array.from(element.childNodes).filter(isTextNode))
        .flat()
    textNodesNotInCode.forEach(escapeTextNode)
}

export const removeCodeBlockWrapper = (htmlElement: Element) => {
    const removeInnerWrapper = (preElement: Element) => {
        const codeElement = preElement.firstElementChild
        const innerDivElement = codeElement?.firstElementChild
        if (!codeElement || !innerDivElement)
            throw new Error('Error parsing during codeblock wrapper removal.')

        codeElement.removeChild(innerDivElement)
        codeElement.append(...Array.from(innerDivElement.childNodes))
    }

    htmlElement.querySelectorAll('.react-renderer.node-codeBlock').forEach((wrapper) => {
        const parentElement = wrapper.parentElement
        const preElement = wrapper.querySelector('pre')
        if (!parentElement || !preElement)
            throw new Error('Error parsing during codeblock wrapper removal.')

        parentElement.replaceChild(preElement, wrapper)
        removeInnerWrapper(preElement)
    })
}

export const removeImageWrapper = (htmlElement: Element) => {
    htmlElement.querySelectorAll('.react-renderer.node-image').forEach((wrapper) => {
        const parentElement = wrapper.parentElement
        const imgElement = wrapper.querySelector('img')
        if (!parentElement || !imgElement)
            throw new Error('Error parsing during image wrapper removal.')

        parentElement.replaceChild(imgElement, wrapper)
    })
}

export const removeWrapperParagraphs = (htmlElement: Element) => {
    htmlElement.querySelectorAll('li > p').forEach((wrapper) => {
        const parentElement = wrapper.parentElement
        if (!parentElement) throw new Error('Error parsing during paragraph wrapper removal.')

        wrapper.before(...Array.from(wrapper.childNodes))
        parentElement.removeChild(wrapper)
    })
}

export const preserveEmptyListItem = (htmlElement: Element) => {
    const emptyListItems = htmlElement.querySelectorAll('li:empty')
    const insertLineBreak = (listItem: Element) => listItem.append(document.createElement('br'))
    emptyListItems.forEach(insertLineBreak)
}

export const preProcessHtml = (htmlElement: Element) => {
    escapeCharacters(htmlElement)
    removeCodeBlockWrapper(htmlElement)
    removeImageWrapper(htmlElement)
    removeWrapperParagraphs(htmlElement)
    removeTipTapArtifacts(htmlElement)
    preserveEmptyListItem(htmlElement)
}
