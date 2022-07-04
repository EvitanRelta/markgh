import { Editor } from '@tiptap/react'

export const blockQuote = (editor: Editor | null) => () => {
    if (!editor) return

    editor.chain().focus().toggleBlockquote().run()
}
