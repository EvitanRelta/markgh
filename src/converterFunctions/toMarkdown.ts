import TurndownService from 'turndown'
import { codeBlocks, quillAlign, resizedImage, strikethrough, underline } from './turndownPlugins'

function escapeAmpersand(html: HTMLElement) {
    html.innerHTML = html.innerHTML.replaceAll('&', '&amp;')
}

export default function htmlToMarkdown(html: HTMLElement) {
    const htmlCopy = html.cloneNode(true) as HTMLElement
    escapeAmpersand(htmlCopy)

    const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced'
    }).use([codeBlocks, underline, quillAlign, strikethrough, resizedImage])

    return turndownService.turndown(htmlCopy)
}