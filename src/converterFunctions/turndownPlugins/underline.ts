import { Plugin } from 'turndown'

const underline: Plugin = (service) => {
    service.addRule('customUnderline', {
        filter: 'u',
        replacement: (content, node, options) =>
            `<ins>${content}</ins>`
    })
}

export default underline