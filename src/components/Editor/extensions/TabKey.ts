import { Extension } from '@tiptap/core'

export const TabKey = Extension.create({
    name: 'tabKey',

    addKeyboardShortcuts() {
        const indentSpaces = 2

        return {
            Tab: () => {
                const editor = this.editor
                if (!editor.isActive('codeBlock')) return editor.commands.insertContent('\t')

                const $anchor = editor.state.selection.$anchor
                const textBeforeCursor = $anchor.parent.textBetween(0, $anchor.parentOffset)
                const textFromStartOfLine = textBeforeCursor.match(/(?<=^|\n)[^\n]*$/)?.[0] || ''
                const charsFromStartOfLine = textFromStartOfLine.length
                const spaces = indentSpaces - (charsFromStartOfLine % indentSpaces)

                return editor.commands.insertContent(' '.repeat(spaces))
            },
            'Shift-Tab': () => {
                const editor = this.editor
                if (!editor.isActive('codeBlock')) return true

                const $anchor = editor.state.selection.$anchor
                const textBeforeCursor = $anchor.parent.textBetween(0, $anchor.parentOffset)
                const textFromStartOfLine = textBeforeCursor.match(/(?<=^|\n)[^\n]*$/)?.[0] || ''
                const currentIndent = /^ */.exec(textFromStartOfLine)?.[0].length || 0

                const canBeUnindented = currentIndent >= indentSpaces
                if (!canBeUnindented) return true

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
