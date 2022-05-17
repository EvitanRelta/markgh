import MarkdownIt from 'markdown-it'
import TurndownService from 'turndown'
import htmlToMarkdown from './htmlToMarkdown'
import parseQuillHtml from './parseQuillHtml'

// @ts-ignore
window.MarkdownIt = MarkdownIt

// @ts-ignore
window.TurndownService = TurndownService

export { parseQuillHtml, htmlToMarkdown }
