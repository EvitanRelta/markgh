import MarkdownIt from 'markdown-it'
import TurndownService from 'turndown'
import htmlToMarkdown from './htmlToMarkdown'

// @ts-ignore
window.MarkdownIt = MarkdownIt

// @ts-ignore
window.TurndownService = TurndownService

export { htmlToMarkdown }