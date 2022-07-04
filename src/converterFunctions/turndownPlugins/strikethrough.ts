import { Plugin } from 'turndown'

export const strikethrough: Plugin = (service) => {
    service.addRule('customStrikethrough', {
        filter: ['del', 's'],
        replacement: (content, node, options) => `~~${content}~~`,
    })
}
