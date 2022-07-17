import { FilterFunction, Plugin, Rule } from 'turndown'
import { escapeTextNode } from '../helpers/preProcessHtml'
import { turndownHtmlOnly } from '../helpers/turndownHtmlOnly'

// Similar to the 'escapeCharacters' in 'preProcessHtml'.
const escapeCharacters = (htmlElement: Element) => {
    const isTextNode = (node: Node) => node.nodeType === node.TEXT_NODE
    const notInCodeBlock = Array.from(htmlElement.querySelectorAll(':not(pre,pre *)'))
    const textNodesNotInCodeBlock = notInCodeBlock
        .concat([htmlElement])
        .map((element) => Array.from(element.childNodes).filter(isTextNode))
        .flat()
    textNodesNotInCodeBlock.forEach(escapeTextNode)
    return htmlElement
}

export const code: Plugin = (service) => {
    //@ts-expect-error
    const defaultRule: Required<Rule> = service.options.rules.code

    service.addRule('customCode', {
        filter: (node, options) => {
            const defaultFilter = defaultRule.filter as FilterFunction
            if (!defaultFilter(node, options)) return false

            // Has repeated spaces.
            return /(^[\xa0 ]|[\xa0 ]$|[\xa0 ]{2})/.test(node.innerHTML)
        },
        replacement: (content, node, options) => {
            const element = node as HTMLElement
            const clone = element.cloneNode(true) as Element
            escapeCharacters(clone)
            return turndownHtmlOnly.turndown(clone.outerHTML)
        },
    })
}
