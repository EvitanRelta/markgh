import { Editor } from '@tiptap/react'

export const italic = (editor: Editor | null) => () => {
    if (!editor) return

    editor.chain().focus().toggleItalic().run()
}
