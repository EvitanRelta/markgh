import { Plugin } from 'turndown'

export const lineBreak: Plugin = (service) => {
    service.addRule('align', {
        filter: 'br',
        replacement: (content, node, options) => {
            return node.nextSibling ? '\n<br>' : '\n<br><br>'
        },
    })
}
