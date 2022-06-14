import TurndownAugmentedNode from '../sharedTypes/TurndownAugmentedNode'
import indent from './indent'

export default (
    node: TurndownAugmentedNode,
    allowedAttributes: string[],
    addIndent: boolean = true
) => {
    const attributesStr = Array.from(node.attributes)
        .filter((attribute) => allowedAttributes.includes(attribute.name))
        .map((attribute) => ` ${attribute.name}="${attribute.value}"`)
        .join('')
    const tag = node.tagName.toLowerCase()
    const hasChildNodes = node.hasChildNodes()
    const isBlock = node.isBlock

    return (content: string = '') =>
        !hasChildNodes
            ? `<${tag}${attributesStr} />`
            : isBlock
            ? `<${tag}${attributesStr}>\n${`${addIndent ? indent(content) : content}`}\n</${tag}>\n`
            : `<${tag}${attributesStr}>${content}</${tag}>`
}
