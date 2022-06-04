import { Editor } from '@tiptap/react'
import addUrlImage from './EditorOptions/toolbarFunctions/addUrlImage'
import bold from './EditorOptions/toolbarFunctions/bold'
import italic from './EditorOptions/toolbarFunctions/italic'


interface Props {
    editor: Editor | null
}

export default ({ editor }: Props) => (
    <div>
        <button onClick={bold(editor)}>Bold</button>
        <button onClick={italic(editor)}>Italic</button>
        <button onClick={addUrlImage(editor)}>Add image via URL</button>
    </div>
)