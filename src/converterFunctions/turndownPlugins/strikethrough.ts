import { Plugin } from 'turndown'

const strikethrough: Plugin = (service) => {
    service.addRule('customStrikethrough', {
        filter: ['del', 's'],
        replacement: (content, node, options) => `~~${content}~~`,
    })
}

export default strikethrough
