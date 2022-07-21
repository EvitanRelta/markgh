import { Plugin } from 'turndown'

export const lineBreak: Plugin = (service) => {
    service.addRule('align', {
        filter: 'br',
        replacement: (content, node, options) => {
            const element = node as Element
            const parent = element.parentElement

            const isEmptyListItem =
                parent !== null && parent.tagName === 'LI' && parent.childNodes.length === 1
            if (isEmptyListItem) return '\n<br>'

            return element.nextSibling ? '\n<br>' : '\n<br><br>'
        },
    })
}
