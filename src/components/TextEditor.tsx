import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { useCallback } from 'react'
import '../githubMarkdownCss/github-markdown-light.css'
import hljs from 'highlight.js'

const TOOLBAR_OPTIONS = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }]
]

export default function TextEditor() {
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

        new Quill(editor, {
            // theme: 'snow',
            modules: {
                syntax: {
                    highlight: (text: string) => hljs.highlightAuto(text).value,
                },
                toolbar: TOOLBAR_OPTIONS
            }
        })
    }, [])

    return (
        <div id='container' ref={wrapperRef}></div>
    )
}