import hljs from 'highlight.js'
import Quill from 'quill'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import '../customCss/custom-quill.css'
import '../customCss/quill-snow-no-editor-css.css'
import '../githubMarkdownCss/importAllGithubCss'
import placeholderEditorHtml from '../placeholderEditorHtml'


const TOOLBAR_OPTIONS = [
    ['bold', 'italic', 'underline', 'strike', 'code'],
    ['blockquote', 'code-block', 'link'],

    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }]
]

interface TextEditorProps {
    setQuill: Dispatch<SetStateAction<Quill | null>>
    theme: 'light' | 'dark'
}

export default function TextEditor({ setQuill, theme }: TextEditorProps) {
    const [editor, setEditor] = useState<HTMLDivElement | null>(null)
    const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
        if (!wrapper) return
        wrapper.innerHTML = ''
        const container = document.createElement('div')
        container.style.boxSizing = 'border-box'
        container.style.minWidth = '200px'
        container.style.maxWidth = '980px'
        container.style.margin = '0 auto'
        container.style.padding = '45px'
        wrapper.append(container)

        const quill = new Quill(container, {
            theme: 'snow',
            modules: {
                syntax: {
                    highlight: (text: string) => hljs.highlightAuto(text).value,
                },
                toolbar: TOOLBAR_OPTIONS
            }
        })

        //@ts-expect-error
        const quillEditor = quill.scrollingContainer as HTMLDivElement
        quillEditor.classList.add('markdown-body', 'gh-light')
        quillEditor.innerHTML = placeholderEditorHtml

        setQuill(quill)
        setEditor(quillEditor)
    }, [])

    useEffect(() => {
        if (!editor) return
        const isGithubCssClassName = (className: string) => /^gh-/.test(className)
        const replaceClassName = (classList: DOMTokenList, oldClassName: string, newClassName: string) => {
            classList.remove(oldClassName)
            classList.add(newClassName)
        }


        const githubCssClassName = Array.from(editor.classList)
            .find(isGithubCssClassName) as string

        replaceClassName(editor.classList, githubCssClassName, `gh-${theme}`)
    }, [editor, theme])


    return (
        <div id='container' ref={wrapperRef}></div>
    )
}
