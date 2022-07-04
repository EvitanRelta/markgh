import { Plugin } from 'turndown'
import { toSanitizedHtmlHOC } from '../helpers/toSanitizedHtmlHOC'
import { TurndownAugmentedNode } from '../sharedTypes/TurndownAugmentedNode'

export const resizedImage: Plugin = (service) => {
    service.addRule('resizedImage', {
        filter: (node, options) =>
            node.nodeName === 'IMG' && (node.hasAttribute('width') || node.hasAttribute('height')),
        replacement: (content, node, options) =>
            toSanitizedHtmlHOC(node as TurndownAugmentedNode, ['src', 'alt', 'width', 'height'])(),
    })
}
