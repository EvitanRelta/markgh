import TurndownService from 'turndown'
import postProcessMarkdown from './helpers/postProcessMarkdown'
import preProcessHtml from './helpers/preProcessHtml'
import { plugins } from './turndownPlugins/plugins'

export default (html: HTMLElement) => {
    const htmlCopy = html.cloneNode(true) as HTMLElement
    preProcessHtml(htmlCopy)

    const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced',
    }).use(plugins)

    const markdown = turndownService.turndown(htmlCopy)
    return postProcessMarkdown(markdown)
}
