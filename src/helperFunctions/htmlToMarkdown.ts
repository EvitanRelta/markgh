import TurndownService from 'turndown'
//@ts-expect-error
import { gfm } from 'turndown-plugin-gfm'

export default function htmlToMarkdown(html: string) {
    const turndownService = new TurndownService({ headingStyle: 'atx' })
    turndownService.use(gfm)
    turndownService.addRule('align', {
        filter: (node, options) => {
            console.log([node])
            const alignment = node.getAttribute('align')?.toLocaleLowerCase() || 'left'
            return ['right', 'center', 'justify'].includes(alignment)
        },
        replacement: (content, node, options) => {
            const tag = node.nodeName.toLowerCase()
            //@ts-expect-error
            const alignment = node.getAttribute('align')
            return `<${tag} align="${alignment}">${content}</${tag}>`
        }
    })
    return turndownService.turndown(html)
}