import TurndownService from 'turndown'
import indent from './indent'
import TurndownAugmentedNode from './sharedTypes/TurndownAugmentedNode'
import toSanitizedHtmlHOC from './toSanitizedHtmlHOC'
import turndownHtmlOnly from './turndownHtmlOnly'
import codeBlocks from './turndownPlugins/codeBlocks'
import underline from './turndownPlugins/underline'

function escapeAmpersand(html: HTMLElement) {
    html.innerHTML = html.innerHTML.replaceAll('&', '&amp;')
}

export default function htmlToMarkdown(html: HTMLElement) {
    const htmlCopy = html.cloneNode(true) as HTMLElement
    escapeAmpersand(htmlCopy)

    const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced'
    }).use([codeBlocks, underline])

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
    turndownService.addRule('strikethrough', {
        filter: ['del', 's'],
        replacement: (content, node, options) => {
            return `~~${content}~~`
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