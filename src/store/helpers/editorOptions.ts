import { EditorOptions } from '@tiptap/react'
import { extensions } from '../../components/Editor/extensions/extensions'

export const editorOptions: Partial<EditorOptions> = {
    extensions,
    parseOptions: { preserveWhitespace: 'full' },
}
