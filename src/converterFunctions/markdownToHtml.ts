import MarkdownIt from 'markdown-it'

export default (markdown: string) => {
    const markdownit = new MarkdownIt({ html: true })
    return markdownit.render(markdown)
}