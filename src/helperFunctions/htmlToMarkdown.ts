import TurndownService from 'turndown'
//@ts-expect-error
import { gfm } from 'turndown-plugin-gfm'

export default function htmlToMarkdown(html: string) {
    const turndownService = new TurndownService({ headingStyle: 'atx' })
    turndownService.use(gfm)
    return turndownService.turndown(html)
}