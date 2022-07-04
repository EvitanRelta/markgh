import { Plugin } from 'turndown'

export const subscript: Plugin = (service) => {
    service.addRule('superscript', {
        filter: 'sub',
        replacement: (content, node, options) => `<sub>${content}</sub>`,
    })
}
