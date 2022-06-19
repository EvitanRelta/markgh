import { Plugin } from 'turndown'

const lineBreak: Plugin = (service) => {
    service.addRule('align', {
        filter: 'br',
        replacement: (content, node, options) => {
            return '\n<br>'
        },
    })
}

export default lineBreak
