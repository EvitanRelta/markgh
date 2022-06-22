import { Plugin } from 'turndown'
import turndownHtmlOnly from '../helpers/turndownHtmlOnly'

const getTableRowMarkdownHOF = (longestTextLens: number[]) => (tr: HTMLTableRowElement) => {
    return (
        '| ' +
        Array.from(tr.cells)
            .map((cell, i) => cell.innerText.padEnd(longestTextLens[i]))
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

            const getCellLen = (cell: HTMLTableCellElement) => cell.innerText.length
            const textLens = [
                Array.from(element.tHead.rows[0].cells).map(getCellLen),
                ...Array.from(element.tBodies[0].rows).map((row) =>
                    Array.from(row.cells).map(getCellLen)
                ),
            ]
            let longestTextLens: number[] = []
            for (let row = 0; row < textLens.length; row++)
                for (let col = 0; col < textLens[0].length; col++)
                    longestTextLens[col] = Math.max(textLens[row][col], longestTextLens[col] || 0)

            const maxColLen = 40
            if (longestTextLens.some((len) => len > maxColLen))
                longestTextLens = longestTextLens.map(() => 1)

            const getTableRowMarkdown = getTableRowMarkdownHOF(longestTextLens)

            const header = getTableRowMarkdown(element.tHead.rows[0])
            const body = Array.from(element.tBodies[0].rows).map(getTableRowMarkdown).join('\n')
            const separatorRow =
                '| ' +
                longestTextLens.map((longestTextLen) => '-'.repeat(longestTextLen)).join(' | ') +
                ' |'
            return header + '\n' + separatorRow + '\n' + body
        },
    })
}

export default table
