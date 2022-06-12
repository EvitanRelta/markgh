import { Plugin } from 'turndown'
import turndownHtmlOnly from '../turndownHtmlOnly'

const align: Plugin = (service) => {
    service.addRule('align', {
        filter: (node, options) => node.getAttribute('align') !== null,
        replacement: (content, node, options) => {
            const element = node as HTMLElement
            return turndownHtmlOnly.turndown(element.outerHTML)
        },
    })
}

export default align
