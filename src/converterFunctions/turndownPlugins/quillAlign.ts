import { Plugin } from 'turndown'
import indent from '../indent'
import turndownHtmlOnly from '../turndownHtmlOnly'

const quillAlign: Plugin = (service) => {
    service.addRule('quillAlign', {
        filter: (node, options) => {
            const classNames = Array.from(node.classList)
            return classNames.some(className => className.includes('ql-align-'))
        },
        replacement: (content, node, options) => {
            const element = node as HTMLElement
            const tag = element.nodeName.toLowerCase()
            const alignment = element.className.match(/(?<=(?<!\S)ql-align-)\S+/)?.[0]
            const innerMarkdown = turndownHtmlOnly.turndown(element)
            return `<${tag} align="${alignment}">\n`
                + indent(innerMarkdown)
                + `\n</${tag}>\n\n`
        }
    })
}

export default quillAlign