import { Plugin } from 'turndown'

export const lineBreak: Plugin = (service) => {
    service.addRule('align', {
        filter: 'br',
        replacement: (content, node, options) => {
            const element = node as Element
            const parent = element.parentElement

            if (parent === null) return element.nextSibling ? '\n<br>' : '\n<br><br>'

            const isHeader = /H[0-6]/.test(parent.tagName)
            const prefix = isHeader ? '' : '\n'

            const isLineBreak = (element: Node) => element.nodeName === 'BR'
            const hasOnlyLineBreaks = (element: Element) =>
                Array.from(element.childNodes).every(isLineBreak)

            return element.nextSibling || hasOnlyLineBreaks(parent)
                ? prefix + '<br>'
                : prefix + '<br><br>'
        },
    })
}
