import { Editor } from '@tiptap/react'

export const strikethrough = (editor: Editor | null) => () => {
    if (!editor) return

    editor.chain().focus().toggleStrike().run()
}
