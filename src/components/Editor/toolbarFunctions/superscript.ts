import { Editor } from '@tiptap/react'

export const superscript = (editor: Editor | null) => () => {
    if (!editor) return

    editor.chain().focus().toggleSuperscript().run()
}
