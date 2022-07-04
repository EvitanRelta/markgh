import { Editor } from '@tiptap/react'

export const underline = (editor: Editor | null) => () => {
    if (!editor) return

    editor.chain().focus().toggleUnderline().run()
}
