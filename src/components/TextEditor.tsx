import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { Dispatch, SetStateAction, useCallback } from 'react'


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
        wrapper.append(editor)

        const quill = new Quill(editor, {
            theme: 'snow',
            modules: { toolbar: TOOLBAR_OPTIONS }
        })

        setQuill(quill)
    }, [])


    return (
        <div id='container' ref={wrapperRef}></div>
    )
}
