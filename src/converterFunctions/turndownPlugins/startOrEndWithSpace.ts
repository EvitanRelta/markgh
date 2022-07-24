import { Plugin } from 'turndown'
import { turndownHtmlOnly } from '../helpers/turndownHtmlOnly'

export const startOrEndWithSpace: Plugin = (service) => {
    service.addRule('startOrEndWithSpace', {
        filter: (node, options) => {
            // Bold, italic & strikethroughs.
            const affectedTags = ['STRONG', 'B', 'EM', 'I', 'DEL', 'S']
            if (!affectedTags.includes(node.nodeName)) return false

            // '&nbsp;' characters have already been escaped during preprocess.
            const startOrEndWithSpace = /(^(&nbsp;| )|(&nbsp;| )$)/.test(node.textContent ?? '')
            return startOrEndWithSpace
        },
        replacement: (content, node, options) => {
            const element = node as HTMLElement
            return turndownHtmlOnly.turndown(element.outerHTML)
        },
    })
}
