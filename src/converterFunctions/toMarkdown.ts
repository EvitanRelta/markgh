import { turndownService } from './helpers/initTurndownService'
import { postProcessMarkdown } from './helpers/postProcessMarkdown'
import { preProcessHtml } from './helpers/preProcessHtml'

export const toMarkdown = (html: Element) => {
    const htmlCopy = html.cloneNode(true) as HTMLElement
    preProcessHtml(htmlCopy)

    const markdown = turndownService.turndown(htmlCopy)
    return postProcessMarkdown(markdown)
}
