import { Editor } from '@tiptap/react'

export const codeBlock = (editor: Editor | null) => () => {
    if (!editor) return

    editor.chain().focus().toggleCodeBlock().run()
}
