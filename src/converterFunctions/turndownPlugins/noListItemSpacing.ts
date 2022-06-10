import { Plugin } from 'turndown'

const noListItemSpacing: Plugin = (service) => {
    service.addRule('noListItemSpacing', {
        filter: (node, options) => {
            if (node.nodeName !== 'P') return false

            const parent = node.parentElement
            if (!parent || parent.nodeName !== 'LI') return false

            return parent.classList.contains('no-list-item-spacing')
        },
        replacement: (content, node, options) => content,
    })
}

export default noListItemSpacing
