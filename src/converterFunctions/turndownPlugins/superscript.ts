import { Plugin } from 'turndown'

export const superscript: Plugin = (service) => {
    service.addRule('superscript', {
        filter: 'sup',
        replacement: (content, node, options) => `<sup>${content}</sup>`,
    })
}
