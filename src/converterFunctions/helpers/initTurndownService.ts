import TurndownService from 'turndown'
import { plugins } from '../turndownPlugins/plugins'

export const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    hr: '---',
    emDelimiter: '*',
    // @ts-expect-error (turndown types are outdated)
    // Prevents collapsing of whitespace in <code> tags.
    preformattedCode: true,
}).use(plugins)
