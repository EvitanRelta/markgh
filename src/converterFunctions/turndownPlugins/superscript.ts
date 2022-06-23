import { Plugin } from 'turndown'

const superscript: Plugin = (service) => {
    service.addRule('superscript', {
        filter: 'sup',
        replacement: (content, node, options) => `<sup>${content}</sup>`,
    })
}

export default superscript
