import { Plugin } from 'turndown'

const subscript: Plugin = (service) => {
    service.addRule('superscript', {
        filter: 'sub',
        replacement: (content, node, options) => `<sub>${content}</sub>`,
    })
}

export default subscript
