import TurndownService from 'turndown'
import TurndownAugmentedNode from './sharedTypes/TurndownAugmentedNode'
import toSanitizedHtmlHOC from './toSanitizedHtmlHOC'
import codeBlocks from './turndownPlugins/codeBlocks'
import quillAlign from './turndownPlugins/quillAlign'
import strikethrough from './turndownPlugins/strikethrough'
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
    }).use([codeBlocks, underline, quillAlign, strikethrough])

    turndownService.addRule('sizedImage', {
        filter: (node, options) =>
            node.nodeName === 'IMG'
            && (node.hasAttribute('width') || node.hasAttribute('height')),
        replacement: (content, node, options) =>
            toSanitizedHtmlHOC(node as TurndownAugmentedNode, ['src', 'alt', 'width', 'height'])()
    })
    return turndownService.turndown(htmlCopy)
}