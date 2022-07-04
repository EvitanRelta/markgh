import MarkdownIt from 'markdown-it'
import TurndownService from 'turndown'
import { markdownToHtml } from './markdownToHtml'
import { toMarkdown } from './toMarkdown'

// @ts-ignore
window.MarkdownIt = MarkdownIt

// @ts-ignore
window.TurndownService = TurndownService

export { toMarkdown, markdownToHtml }
