import { Editor } from '@tiptap/react'

export const link = (editor: Editor | null) => () => {
    if (!editor) return

    const hasNoSelection = editor.view.state.selection.empty
    if (hasNoSelection) return

    const hasLink = editor.getAttributes('link').href !== undefined
    if (hasLink) {
        editor.chain().focus().unsetLink().run()
        return
    }

    const url = window.prompt('URL')

    if (!url) return

    editor.chain().focus().setLink({ href: url }).run()
}
