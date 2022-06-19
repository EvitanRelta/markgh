import MarkdownIt from 'markdown-it'

export default (markdown: string) => {
    const markdownit = new MarkdownIt({ html: true, linkify: true })
    const htmlString = markdownit.render(markdown)
    return htmlString.replaceAll(/\n(?=<\/code><\/pre>)/g, '')
}
