import { Plugin } from 'turndown'

export const emptyParagraph: Plugin = (service) => {
    const hasOnlyOneLineBreak = (element: Element) =>
        element.childNodes.length === 1 && element.firstChild!.nodeName === 'BR'

    service.addRule('emptyParagraph', {
        filter: (node, options) => node.tagName === 'P' && hasOnlyOneLineBreak(node),
        replacement: (content, node, options) => '\n\n<p><br></p>\n\n',
    })
}
