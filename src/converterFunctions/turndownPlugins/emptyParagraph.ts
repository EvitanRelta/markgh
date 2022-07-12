import { Plugin } from 'turndown'

export const emptyParagraph: Plugin = (service) => {
    service.rules.blankRule = {
        // @ts-expect-error
        // Turndown types has incorrect type
        replacement: (content, node, options) => '<p><br></p>\n\n',
    }
}
