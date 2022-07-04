import { Editor } from '@tiptap/react'

export const bold = (editor: Editor | null) => () => {
    if (!editor) return

    editor.chain().focus().toggleBold().run()
}
