import { Plugin } from 'turndown'

export const lineBreak: Plugin = (service) => {
    service.addRule('align', {
        filter: 'br',
        replacement: (content, node, options) => {
            return '\n<br>'
        },
    })
}
