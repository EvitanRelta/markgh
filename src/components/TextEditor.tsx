import { EditorContent, useEditor } from '@tiptap/react'
import { useEffect, useState } from 'react'
import '../customCss/fix-codeblock-bottom-spacing.css'
import '../githubMarkdownCss/importAllGithubCss'
import placeholderEditorHtml from '../placeholderEditorHtml'
import extensions from './EditorOptions/extensions'


interface Props {
    theme: 'light' | 'dark'
}

export default ({ theme }: Props) => {
    const [editorContainer, setEditorContainer] = useState<HTMLElement | null>(null)
    const editor = useEditor({
        extensions,
        content: placeholderEditorHtml,
    })

    useEffect(() => {
        if (!editor) return

        const editorContainer = editor.view.dom
        editorContainer.classList.add('markdown-body')
        setEditorContainer(editorContainer)

        const parentContainer = editorContainer.parentElement as HTMLDivElement
        parentContainer.classList.add('markdown-container')
    }, [editor])

    useEffect(() => {
        if (!editorContainer) return

        const classList = editorContainer.classList
        const isGithubCssClassName = (className: string) => /^gh-/.test(className)

        Array.from(classList)
            .filter(isGithubCssClassName)
            .forEach(className => classList.remove(className))

        classList.add(`gh-${theme}`)
    }, [editorContainer, theme])


    return (
        <div>
            <EditorContent editor={editor} />
        </div>
    )
}