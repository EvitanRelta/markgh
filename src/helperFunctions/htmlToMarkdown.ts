import TurndownService from 'turndown'
//@ts-expect-error
import { gfm } from 'turndown-plugin-gfm'

export default function htmlToMarkdown(html: string) {
    const spaceToNbsp = html
        .replaceAll(/\n(?=<\/pre>)/g, '')
        .replaceAll(/(?<!<pre[^<]*>[^<]*)(?<=\s)\s/g, '&nbsp;')
        .replaceAll(/(?<!<pre[^<]*>[^<]*)(?<=>)\s/g, '&nbsp;')
        .replaceAll(/(?<!<pre[^<]*>[^<]*)\s(?=<)/g, '&nbsp;')
    const escapedAmp = spaceToNbsp.replaceAll(/(?<!<pre[^<]*>[^<]*)&/g, '&amp;')
        
    const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced'
    })
    turndownService.use(gfm)
    turndownService.addRule('align', {
        filter: (node, options) => {
            const classNames: string[] = Array.from(node.classList)
            return classNames.some(className => className.includes('ql-align-'))
        },
        replacement: (content, node, options) => {
            const tag = node.nodeName.toLowerCase()
            //@ts-expect-error
            const classNames: string[] = Array.from(node.classList)
            const alignment = classNames
                .find(className => className.includes('ql-align-'))
                ?.replace('ql-align-', '')
            return `<${tag} align="${alignment}">${content}</${tag}>`
        }
    })
    turndownService.addRule('codeblock', {
        filter: 'pre',
        replacement: (content, node, options) => {
            return "```\n" + content + "\n```\n"
        }
    })
    return turndownService.turndown(escapedAmp)
}