import MarkdownIt from 'markdown-it'
import TurndownService from 'turndown'
import htmlToMarkdown from './htmlToMarkdown'
import markdownToHtml from './markdownToHtml'

// @ts-ignore
window.MarkdownIt = MarkdownIt

// @ts-ignore
window.TurndownService = TurndownService

export { htmlToMarkdown, markdownToHtml }