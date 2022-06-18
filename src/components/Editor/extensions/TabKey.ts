import { Extension } from '@tiptap/core'

export interface TabKeyOptions {
    codeBlockIndentSpaces: number
}

export const TabKey = Extension.create<TabKeyOptions>({
    name: 'tabKey',

    addOptions() {
        return {
            codeBlockIndentSpaces: 2,
        }
    },

    addKeyboardShortcuts() {
        return {
            Tab: () => {
                const editor = this.editor
                if (editor.isActive('listItem')) return false
                if (!editor.isActive('codeBlock')) return editor.commands.insertContent('\t')

                const indentSpaces = this.options.codeBlockIndentSpaces
                const $anchor = editor.state.selection.$anchor
                const textBeforeCursor = $anchor.parent.textBetween(0, $anchor.parentOffset)
                const textFromStartOfLine = textBeforeCursor.match(/(?<=^|\n)[^\n]*$/)?.[0] || ''
                const charsFromStartOfLine = textFromStartOfLine.length
                const spaces = indentSpaces - (charsFromStartOfLine % indentSpaces)

                return editor.commands.insertContent(' '.repeat(spaces))
            },
            'Shift-Tab': () => {
                const editor = this.editor
                if (editor.isActive('listItem')) return false
                if (!editor.isActive('codeBlock')) return true

                const indentSpaces = this.options.codeBlockIndentSpaces
                const $anchor = editor.state.selection.$anchor
                const textBeforeCursor = $anchor.parent.textBetween(0, $anchor.parentOffset)
                const textFromStartOfLine = textBeforeCursor.match(/(?<=^|\n)[^\n]*$/)?.[0] || ''

                const textAfterCursor = $anchor.parent.textContent.slice($anchor.parentOffset)
                const textFromCursorTillEOL = textAfterCursor.match(/^[^\n]*(?=\n|$)/)?.[0] || ''

                const currentLine = textFromStartOfLine + textFromCursorTillEOL
                const currentIndent = /^ */.exec(currentLine)?.[0].length || 0
                const canBeUnindented = currentIndent >= indentSpaces
                if (!canBeUnindented) return true

                const cursorIsInIndent =
                    /^ *$/.test(textFromStartOfLine) &&
                    textFromCursorTillEOL !== '' &&
                    textFromCursorTillEOL[0] === ' '

                if (cursorIsInIndent) {
                    // Moves cursor to the end of the indent
                    // eg. "    |  TEXT", where | is the cursor
                    // becomes: "      |TEXT"
                    const offset = /^ +/.exec(textFromCursorTillEOL)?.[0].length || 0
                    editor.commands.setTextSelection($anchor.pos + offset)
                }

                const spacesToDelete = currentIndent % indentSpaces || indentSpaces
                const charsFromStartOfLine = textFromStartOfLine.length
                const startOfLinePos = $anchor.pos - charsFromStartOfLine
                return editor.commands.deleteRange({
                    from: startOfLinePos,
                    to: startOfLinePos + spacesToDelete,
                })
            },
        }
    },
})
