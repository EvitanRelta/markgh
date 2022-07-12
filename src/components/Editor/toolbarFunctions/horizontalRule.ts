import { Editor } from '@tiptap/react'

export const horizontalRule = (editor: Editor | null) => () => {
    if (!editor) return

    editor.chain().focus().setHorizontalRule().run()
}
