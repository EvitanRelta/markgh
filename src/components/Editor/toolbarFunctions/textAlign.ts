import { Editor } from '@tiptap/react'

type Alignment = 'left' | 'center' | 'right' | 'justify'

export const textAlign = (editor: Editor | null) => (alignment: Alignment) => {
    if (!editor) return

    editor.chain().focus().setTextAlign(alignment).run()
}
