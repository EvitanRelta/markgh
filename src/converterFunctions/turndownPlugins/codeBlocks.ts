import { Plugin } from 'turndown'
import turndownHtmlOnly from '../turndownHtmlOnly'

const codeBlocks: Plugin = (service) => {
    service.addRule('customFencedCodeBlock', {
        filter: 'pre',
        replacement: (content, node, options) => {
            const element = node as HTMLElement
            const hasNonSpanElements = element.querySelectorAll(':not(span)').length !== 0

            if (hasNonSpanElements) {
                return turndownHtmlOnly.turndown(element.outerHTML)
            }

            const className = element.getAttribute('class') || ''
            const language = (className.match(/language-(\S+)/) || [null, ''])[1]
            const code = element.textContent || ''
            
            if (options.fence === undefined)
                throw new Error('`options.fence` is undefined.')

            const calculateFenceLength = (code: string, fenceChar: string) => {
                let fenceLength = 3
                const fenceRegex = new RegExp(`^${fenceChar}{3,}`, 'gm')
                const matches = code.match(fenceRegex)
    
                if (matches) {
                    const longestFenceLenInCode = Math.max(...matches.map(match => match.length))
                    fenceLength = longestFenceLenInCode + 1
                }
                return fenceLength
            }

            const fenceChar = options.fence.charAt(0)
            const repeat = (character: string, count: number) => Array(count + 1).join(character)
            const fence = repeat(fenceChar, calculateFenceLength(code, fenceChar))
      
            return '\n\n'
                + `${fence}${language}\n`
                + code.replace(/\n$/, '')
                + `\n${fence}`
                + '\n\n'
        }
    })
}

export default codeBlocks