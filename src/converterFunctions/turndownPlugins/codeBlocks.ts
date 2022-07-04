import { Plugin, Rule } from 'turndown'
import { tipTapArtifactClassNames } from '../helpers/tipTapArtifactClassNames'
import { turndownHtmlOnly } from '../helpers/turndownHtmlOnly'

export const codeBlocks: Plugin = (service) => {
    //@ts-expect-error
    const defaultRule: Required<Rule> = service.options.rules.fencedCodeBlock

    service.addRule('customFencedCodeBlock', {
        filter: defaultRule.filter,
        replacement: (content, node, options) => {
            const element = node as HTMLElement
            const innerCodeElement = element.firstChild as HTMLElement
            const notTipTapArtifactSelector = tipTapArtifactClassNames
                .map((className) => `:not(.${className})`)
                .join('')
            const hasNonSpanElements =
                innerCodeElement.querySelectorAll(':not(span)' + notTipTapArtifactSelector)
                    .length !== 0

            return hasNonSpanElements
                ? turndownHtmlOnly.turndown(element.outerHTML)
                : defaultRule.replacement(content, node, options)
        },
    })
}
