import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { lowlight } from 'lowlight/lib/all'
import { CodeBlockComponent } from './components/CodeBlockComponent'

export const SyntaxHighlightCodeBlock = CodeBlockLowlight.extend({
    addNodeView() {
        return ReactNodeViewRenderer(CodeBlockComponent)
    },
}).configure({
    lowlight,
    defaultLanguage: 'plaintext',
})
