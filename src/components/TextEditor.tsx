import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { useCallback, useState } from 'react'
import { markdownToHtml, toMarkdown } from '../converterFunctions'

const TOOLBAR_OPTIONS = [
    ['bold', 'italic', 'underline', 'strike', 'code'],
    ['blockquote', 'code-block', 'link'],

    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
]

export default function TextEditor() {
    const [quill, setQuill] = useState<Quill | null>(null)
    const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
        if (!wrapper) return
        wrapper.innerHTML = ''
        const editor = document.createElement('div')
        wrapper.append(editor)
        const quill = new Quill(editor, {
            theme: 'snow',
            modules: { toolbar: TOOLBAR_OPTIONS }
        })

        setQuill(quill)
        //@ts-ignore
        window.quill = quill
        quill.on('text-change', () => {
            const rawHtml = quill.root
            const markdown = toMarkdown(rawHtml)
            const renderedMarkdown = markdownToHtml(markdown)

            // @ts-ignore
            document.getElementById('raw-html').innerText = rawHtml.innerHTML
            // @ts-ignore
            document.getElementById('markdown').innerText = markdown
            // @ts-ignore
            document.getElementById('rendered-markdown').innerHTML = renderedMarkdown
        })
    }, [])

    return (
        <div id='container' ref={wrapperRef}></div>
    )
}