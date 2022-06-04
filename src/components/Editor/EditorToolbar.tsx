import { Editor } from '@tiptap/react'
import addUrlImage from './toolbarFunctions/addUrlImage'
import bold from './toolbarFunctions/bold'
import italic from './toolbarFunctions/italic'
import underline from './toolbarFunctions/underline'


interface Props {
    editor: Editor | null
}

export default ({ editor }: Props) => (
    <div>
        <button onClick={bold(editor)}>Bold</button>
        <button onClick={italic(editor)}>Italic</button>
        <button onClick={underline(editor)}>Underline</button>
        <button onClick={addUrlImage(editor)}>Add image via URL</button>
    </div>
)