import { Plugin } from 'turndown'
import turndownHtmlOnly from '../helpers/turndownHtmlOnly'

const canBeInMarkdown = (element: HTMLTableElement) => {
    if (element.tHead === null) return false
    if (element.tHead.hasAttribute('height') || element.tBodies[0].hasAttribute('height'))
        return false

    const rowHasHeight = (row: HTMLTableRowElement) => row.hasAttribute('height')
    if (
        Array.from(element.tHead.rows).some(rowHasHeight) ||
        Array.from(element.tBodies[0].rows).some(rowHasHeight)
    )
        return false

    const getCells = (row: HTMLTableRowElement) => Array.from(row.cells)
    const cells = [
        Array.from(element.tHead.rows[0].cells),
        ...Array.from(element.tBodies[0].rows).map(getCells),
    ]

    const cellHasSize = (cell: HTMLTableCellElement) =>
        cell.hasAttribute('width') || cell.hasAttribute('height')
    const cellHasInvalidAlign = (cell: HTMLTableCellElement) =>
        ![null, 'left', 'center', 'right'].includes(cell.getAttribute('align'))
    if (
        cells.some((row) => row.some(cellHasSize)) ||
        cells.some((row) => row.some(cellHasInvalidAlign))
    )
        return false

    // Ensures each column has same alignment
    const firstRowAligns = cells[0].map((cell) => cell.getAttribute('align'))
    for (let row = 1; row < cells.length; row++)
        for (let col = 0; col < cells[0].length; col++)
            if (cells[row][col].getAttribute('align') !== firstRowAligns[col]) return false

    return true
}

const getTableRowMarkdownHOF = (longestTextLens: number[]) => (contentRow: string[]) => {
    return (
        '| ' + contentRow.map((content, i) => content.padEnd(longestTextLens[i])).join(' | ') + ' |'
    )
}

// Presumes 'element.tHead' only has 1 row,
// and 'element.tBodies' only has 1 tbody element.
// Allows the attributes 'align' & 'height' on thead, tbody, tr.
// Allows 'align', 'width, 'height' on th, td.
const table: Plugin = (service) => {
    service.addRule('table', {
        filter: 'table',
        replacement: (content, node, options) => {
            const element = node as HTMLTableElement
            if (!canBeInMarkdown(element)) return turndownHtmlOnly.turndown(element)
            const tHead = element.tHead as HTMLTableSectionElement

            const getCells = (row: HTMLTableRowElement) => Array.from(row.cells)
            const cells = [
                Array.from(tHead.rows[0].cells),
                ...Array.from(element.tBodies[0].rows).map(getCells),
            ]

            const cellContents = cells.map((row) =>
                row.map((cell) => service.turndown(cell.innerHTML))
            )
            const isMultiLined = (markdown: string) => /\n/i.test(markdown)
            const hasHtml = (markdown: string) => /(?<!\\)<[a-z]/i.test(markdown)
            const test = (markdown: string) => isMultiLined(markdown) || hasHtml(markdown)
            if (cellContents.some((row) => row.some(test)))
                return turndownHtmlOnly.turndown(element)

            const textLens = cellContents.map((row) => row.map((content) => content.length))

            // Getting longest text length of each rows.
            let longestTextLens: number[] = []
            for (let row = 0; row < textLens.length; row++)
                for (let col = 0; col < textLens[0].length; col++)
                    longestTextLens[col] = Math.max(textLens[row][col], longestTextLens[col] || 3)

            const maxColLen = 40
            if (longestTextLens.some((len) => len > maxColLen))
                longestTextLens = longestTextLens.map(() => 0)

            const getTableRowMarkdown = getTableRowMarkdownHOF(longestTextLens)
            const header = getTableRowMarkdown(cellContents[0])
            const body = cellContents.slice(1).map(getTableRowMarkdown).join('\n')
            const separatorRow =
                '| ' +
                longestTextLens
                    .map((longestTextLen) => '-'.repeat(Math.max(longestTextLen, 3)))
                    .join(' | ') +
                ' |'
            return header + '\n' + separatorRow + '\n' + body
        },
    })
}

export default table
