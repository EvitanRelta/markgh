import { Editor } from '@tiptap/react'

export default (editor: Editor | null) => () => {
    if (!editor) return

    if (editor.getAttributes('listItem').listItemSpacing)
        editor.chain().focus().unsetListItemSpacing().run()
    else editor.chain().focus().setListItemSpacing().run()
}
