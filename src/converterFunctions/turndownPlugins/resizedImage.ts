import { Plugin } from 'turndown'
import TurndownAugmentedNode from '../sharedTypes/TurndownAugmentedNode'
import toSanitizedHtmlHOC from '../toSanitizedHtmlHOC'

const resizedImage: Plugin = (service) => {
    service.addRule('resizedImage', {
        filter: (node, options) =>
            node.nodeName === 'IMG' && (node.hasAttribute('width') || node.hasAttribute('height')),
        replacement: (content, node, options) =>
            toSanitizedHtmlHOC(node as TurndownAugmentedNode, ['src', 'alt', 'width', 'height'])(),
    })
}

export default resizedImage
