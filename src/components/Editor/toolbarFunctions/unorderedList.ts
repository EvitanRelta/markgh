import { Editor } from '@tiptap/react'

export const unorderedList = (editor: Editor | null) => () => {
    if (!editor) return

    editor.chain().focus().toggleBulletList().run()
}
