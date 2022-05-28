import hljs from 'highlight.js'
import Quill from 'quill'
import { Dispatch, SetStateAction, useCallback } from 'react'
import '../customCss/custom-quill.css'
import '../githubMarkdownCss/light.css'
import '../githubMarkdownCss/syntaxHighlighting/light.highlight.css'
import '../quill-snow-base.css'
import testHtml from '../testHtml'


const TOOLBAR_OPTIONS = [
    ['bold', 'italic', 'underline', 'strike', 'code'],
    ['blockquote', 'code-block', 'link'],

    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }]
]

interface TextEditorProps {
    setQuill: Dispatch<SetStateAction<Quill | null>>
}

export default function TextEditor({ setQuill }: TextEditorProps) {
    const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
        if (!wrapper) return
        wrapper.innerHTML = ''
        const editor = document.createElement('div')
        editor.className = 'markdown-body'
        editor.style.boxSizing = 'border-box'
        editor.style.minWidth = '200px'
        editor.style.maxWidth = '980px'
        editor.style.margin = '0 auto'
        editor.style.padding = '45px'
        wrapper.append(editor)

        const quill = new Quill(editor, {
            theme: 'snow',
            modules: {
                syntax: {
                    highlight: (text: string) => hljs.highlightAuto(text).value,
                },
                toolbar: TOOLBAR_OPTIONS
            }
        })

        setQuill(quill)
        editor.getElementsByClassName('ql-editor')[0].innerHTML = testHtml
    }, [])


    return (
        <div id='container' ref={wrapperRef}></div>
    )
}
