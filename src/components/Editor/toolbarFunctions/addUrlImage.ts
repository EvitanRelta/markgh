import { Editor } from '@tiptap/react'

export const addUrlImage = (editor: Editor | null) => () => {
    if (!editor) return

    const url = window.prompt('URL')

    if (!url) return

    editor.chain().focus().setImage({ src: url }).run()
}
