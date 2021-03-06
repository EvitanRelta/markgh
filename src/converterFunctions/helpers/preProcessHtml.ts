import { removeTipTapArtifacts } from './removeTipTapArtifacts'
import { replaceTabsWApproxSpaces } from './tabEmulation/replaceTabsWApproxSpaces'

// Helper function for escaping characters.
export const escapeTextNode = (textNode: Node) => {
    if (!textNode.nodeValue) return
    textNode.nodeValue = textNode.nodeValue
        .replace(/(?<!\\)&(?=\S+;)/gi, '&amp;')
        .replaceAll('\u2003', '&emsp;')
        .replaceAll('\u2002', '&ensp;')
        .replaceAll('\xa0', ' ')
        .replaceAll('\u2009', '&thinsp;')
        .replaceAll('\u200A', '&hairsp;')
        .replaceAll('  ', '&nbsp; ')
        .replace(/^ | $|(?<=\s) (?=\S)/g, '&nbsp;')
        .replace(/(?<!\\)<(?=\/?[a-z])/gi, '&lt;')
}

const isTextNode = (node: Node) => node.nodeType === node.TEXT_NODE

export const replaceTabs = (element: Element) => {
    Array.from(element.childNodes)
        .filter(isTextNode)
        .forEach((node) => {
            node.nodeValue = replaceTabsWApproxSpaces(node.nodeValue!)
        })
    Array.from(element.children).forEach(replaceTabs)
}

const escapeCharacters = (htmlElement: Element) => {
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

export const preserveBlankElements = (htmlElement: Element) => {
    const isBlank = (element: Element) => /^\s*$/.test(element.textContent ?? '')
    const insertLineBreak = (listItem: Element) => listItem.append(document.createElement('br'))
    const elements = Array.from(htmlElement.querySelectorAll('li,p,h1,h2,h3,h4,h5,h6'))
    elements.filter(isBlank).forEach(insertLineBreak)
}

export const preProcessHtml = (htmlElement: Element) => {
    replaceTabs(htmlElement)
    escapeCharacters(htmlElement)
    removeCodeBlockWrapper(htmlElement)
    removeImageWrapper(htmlElement)
    removeWrapperParagraphs(htmlElement)
    removeTipTapArtifacts(htmlElement)
    preserveBlankElements(htmlElement)
}
