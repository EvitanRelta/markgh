import { Extension } from '@tiptap/core'

export const TabKey = Extension.create({
    name: 'tabKey',

    addKeyboardShortcuts() {
        return {
            Tab: () => {
                const editor = this.editor
                return editor.commands.insertContent('\t')
            },
        }
    },
})
