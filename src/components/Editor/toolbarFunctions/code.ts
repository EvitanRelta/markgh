import { Editor } from '@tiptap/react'

export const code = (editor: Editor | null) => () => {
    if (!editor) return

    editor.chain().focus().toggleCode().run()
}
