import { Plugin } from 'turndown'
import turndownHtmlOnly from '../helpers/turndownHtmlOnly'

const getTableRowMarkdown = (tr: HTMLTableRowElement) => {
    return (
        '| ' +
        Array.from(tr.cells)
            .map((cell) => cell.innerText)
            .join(' | ') +
        ' |'
    )
}

const table: Plugin = (service) => {
    service.addRule('table', {
        filter: 'table',
        replacement: (content, node, options) => {
            const element = node as HTMLTableElement
            if (element.tHead === null) return turndownHtmlOnly.turndown(element.outerHTML)

            const numOfRows = element.tHead.rows[0].cells.length
            const header = getTableRowMarkdown(element.tHead.rows[0])
            const body = Array.from(element.tBodies[0].rows).map(getTableRowMarkdown).join('\n')
            return header + `\n|${' - |'.repeat(numOfRows)}\n` + body
        },
    })
}

export default table
