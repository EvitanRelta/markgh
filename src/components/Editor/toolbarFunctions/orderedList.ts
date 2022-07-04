import { Editor } from '@tiptap/react'

export const orderedList = (editor: Editor | null) => () => {
    if (!editor) return

    editor.chain().focus().toggleOrderedList().run()
}
