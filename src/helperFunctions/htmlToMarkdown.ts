import TurndownService from 'turndown'

function escapeAmpersand(html: HTMLElement) {
    html.innerHTML = html.innerHTML.replaceAll('&', '&amp;')
}

function removeExtraNewlineInCodeblock(element: HTMLElement) {
    if (element.nodeName === 'PRE') {
        //@ts-ignore
        element.lastChild.data = element.lastChild.data.replace(/\n$/, '')
        return
    }
    const children = Array.from(element.children) as HTMLElement[]
    children.forEach(removeExtraNewlineInCodeblock)
}

export default function htmlToMarkdown(html: HTMLElement) {
    const htmlCopy = html.cloneNode(true) as HTMLElement
    removeExtraNewlineInCodeblock(htmlCopy)
    escapeAmpersand(htmlCopy)

    const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced'
    })
    turndownService.addRule('align', {
        filter: (node, options) => {
            const classNames: string[] = Array.from(node.classList)
            return classNames.some(className => className.includes('ql-align-'))
        },
        replacement: (content, node, options) => {
            const tag = node.nodeName.toLowerCase()
            //@ts-expect-error
            const classNames: string[] = Array.from(node.classList)
            const alignment = classNames
                .find(className => className.includes('ql-align-'))
                ?.replace('ql-align-', '')
            console.log(content)
            return `<${tag} align="${alignment}">\n\n${content}\n\n</${tag}>\n`
        }
    })
    turndownService.addRule('codeblock', {
        filter: 'pre',
        replacement: (content, node, options) => {
            return "```\n" + content + "\n```\n"
        }
    })
    turndownService.addRule('strikethrough', {
        filter: ['del', 's'],
        replacement: (content, node, options) => {
            return `~~${content}~~`
        }
    })
    turndownService.addRule('underline', {
        filter: 'u',
        replacement: (content, node, options) => {
            return `<ins>${content}</ins>`
        }
    })
    return turndownService.turndown(htmlCopy)
}