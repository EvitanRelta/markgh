import Quill from 'quill'
import { useCallback } from 'react'
import '../customCss/custom-quill.css'
import '../github-markdown-css/github-markdown-light.css'
import '../quill-snow-base.css'
import testHtml from '../testHtml'

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
            theme: 'snow',
            modules: { toolbar: TOOLBAR_OPTIONS }
        })

        editor.getElementsByClassName('ql-editor')[0].innerHTML = testHtml
    }, [])

    return (
        <div id='container' ref={wrapperRef}></div>
    )
}