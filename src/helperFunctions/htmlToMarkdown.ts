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
    turndownService.addRule('htmlLinks', {
        filter: (node, options) => {
            let parentElement = node.parentElement
            while (parentElement && parentElement.id !== 'turndown-root') {
                if (parentElement.className !== '')
                    return true
                parentElement = parentElement.parentElement
            }
            return false
        },
        replacement: (content, node, options) => {
            return `<a href="${(node as HTMLElement).getAttribute('href')}">${content}</a>`
        }
    })
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
            console.log(content)
            return `<${tag} align="${alignment}">${content}</${tag}>`
        }
    })
    turndownService.addRule('codeblock', {
        filter: 'pre',
        replacement: (content, node, options) => {
            return "```\n" + content + "\n```\n"
        }
    })
    turndownService.addRule('strikethrough', {
        filter: ['del', 's'],
        replacement: (content, node, options) => {
            return `~~${content}~~`
        }
    })
    return turndownService.turndown(escapedAmp)
}