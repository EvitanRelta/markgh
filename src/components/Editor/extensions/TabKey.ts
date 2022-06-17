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
        }
    },
})
