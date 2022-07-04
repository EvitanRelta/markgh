import { Editor } from '@tiptap/react'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export const heading = (editor: Editor | null) => (level: 0 | HeadingLevel) => {
    if (!editor) return

    if (level === 0) {
        editor.chain().focus().setParagraph().run()
        return
    }

    editor.chain().focus().setHeading({ level }).run()
}
