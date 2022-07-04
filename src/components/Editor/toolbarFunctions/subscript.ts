import { Editor } from '@tiptap/react'

export const subscript = (editor: Editor | null) => () => {
    if (!editor) return

    editor.chain().focus().toggleSubscript().run()
}
