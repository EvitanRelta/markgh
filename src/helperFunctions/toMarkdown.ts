import TurndownService from 'turndown'
import indent from './indent'
import TurndownAugmentedNode from './sharedTypes/TurndownAugmentedNode'
import toSanitizedHtmlHOC from './toSanitizedHtmlHOC'
import turndownHtmlOnly from './turndownHtmlOnly'

function escapeAmpersand(html: HTMLElement) {
    html.innerHTML = html.innerHTML.replaceAll('&', '&amp;')
}

function removeExtraNewlineInCodeblock(element: HTMLElement) {
    if (element.nodeName === 'PRE') {
        //@ts-ignore
        element.lastChild.data = element.lastChild.data.replace(/\n$/, '')
        return
    }
    const children = Array.from(element.children) as HTMLElement[]
    children.forEach(removeExtraNewlineInCodeblock)
}

export default function htmlToMarkdown(html: HTMLElement) {
    const htmlCopy = html.cloneNode(true) as HTMLElement
    removeExtraNewlineInCodeblock(htmlCopy)
    escapeAmpersand(htmlCopy)

    const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced'
    })
    turndownService.addRule('align', {
        filter: (node, options) => {
            const classNames = Array.from(node.classList)
            return classNames.some(className => className.includes('ql-align-'))
        },
        replacement: (content, node, options) => {
            const element = node as HTMLElement
            const tag = element.nodeName.toLowerCase()
            const classNames = Array.from(element.classList)
            const alignment = classNames
                .find(className => className.includes('ql-align-'))
                ?.replace('ql-align-', '')
            const innerMarkdown = turndownHtmlOnly.turndown(element)
            return `<${tag} align="${alignment}">\n`
                + indent(innerMarkdown)
                + `\n</${tag}>\n\n`
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
    turndownService.addRule('underline', {
        filter: 'u',
        replacement: (content, node, options) => {
            return `<ins>${content}</ins>`
        }
    })
    turndownService.addRule('sizedImage', {
        filter: (node, options) =>
            node.nodeName === 'IMG'
            && (node.hasAttribute('width') || node.hasAttribute('height')),
        replacement: (content, node, options) =>
            toSanitizedHtmlHOC(node as TurndownAugmentedNode, ['src', 'alt', 'width', 'height'])()
    })
    return turndownService.turndown(htmlCopy)
}