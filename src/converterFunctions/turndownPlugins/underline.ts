import { Plugin } from 'turndown'

export const underline: Plugin = (service) => {
    service.addRule('customUnderline', {
        filter: 'u',
        replacement: (content, node, options) => `<ins>${content}</ins>`,
    })
}
