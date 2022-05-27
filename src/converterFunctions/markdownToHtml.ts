import MarkdownIt from 'markdown-it'

export default function markdownToHtml(markdown: string) {
    const markdownit = new MarkdownIt({ html:true })
    return markdownit.render(markdown)
}