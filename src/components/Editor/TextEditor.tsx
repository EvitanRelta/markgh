import { EditorContent } from '@tiptap/react'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../githubMarkdownCss/importAllGithubCss'
import { RootState } from '../../store'
import EditorToolbar from './EditorToolbar'

import '../../customCss/fix-codeblock-bottom-spacing.css'
import '../../customCss/fix-codeblock-cannot-type.css'
import '../../customCss/no-list-item-spacing.css'
import '../../customCss/remove-editing-border.css'

interface Props {
    onTextChange: (editorContainer: Element) => void | null
}

export default ({ onTextChange }: Props) => {
    const [editorContainer, setEditorContainer] = useState<Element | null>(null)
    const editor = useSelector((state: RootState) => state.editor.editor)
    const theme = useSelector((state: RootState) => state.theme)

    useEffect(() => {
        if (!editor) return

        const editorContainer = editor.view.dom
        editorContainer.classList.add('markdown-body')
        setEditorContainer(editorContainer)

        editor.on('create', ({ editor }) => {
            onTextChange(editor.view.dom)
        })

        editor.on(
            'update',
            _.debounce(({ editor }) => {
                onTextChange(editor.view.dom)
            }, 50)
        )

        const parentContainer = editorContainer.parentElement as HTMLDivElement
        parentContainer.classList.add('markdown-container')
    }, [editor])

    useEffect(() => {
        if (!editorContainer) return

        const classList = editorContainer.classList
        const isGithubCssClassName = (className: string) => /^gh-/.test(className)

        Array.from(classList)
            .filter(isGithubCssClassName)
            .forEach((className) => classList.remove(className))

        classList.add(`gh-${theme}`)
    }, [editorContainer, theme])

    return (
        <div>
            <EditorToolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}
