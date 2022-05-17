import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { useCallback, useState } from 'react'
import { htmlToMarkdown, parseQuillHtml } from '../helperFunctions'

const TOOLBAR_OPTIONS = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'image'],

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
            modules: {
                toolbar: {
                    container: TOOLBAR_OPTIONS,
                    handlers: {
                        image: () => {
                            const range = quill.getSelection()
                            if (!range) return
                            var value = prompt('please copy paste the image url here.')
                            if (value) {
                                quill.insertEmbed(range.index, 'image', value, Quill.sources.USER)
                            }
                        }
                    }
                },
            }
        })

        setQuill(quill)
        //@ts-ignore
        window.quill = quill
        quill.on('text-change', () => {
            // @ts-ignore
            document.getElementById('raw-html').innerText = quill.container.firstChild.innerHTML

            const html = parseQuillHtml(quill.root.innerHTML)

            // @ts-ignore
            document.getElementById('cleaned-html').innerText = html
            // @ts-ignore
            document.getElementById('markdown').innerText = htmlToMarkdown(html)
        })
    }, [])

    return (
        <div id='container' ref={wrapperRef}></div>
    )
}