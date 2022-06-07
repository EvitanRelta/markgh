import { Editor } from '@tiptap/react'
import addUrlImage from './toolbarFunctions/addUrlImage'
import blockQuote from './toolbarFunctions/blockQuote'
import bold from './toolbarFunctions/bold'
import code from './toolbarFunctions/code'
import codeBlock from './toolbarFunctions/codeBlock'
import heading from './toolbarFunctions/heading'
import italic from './toolbarFunctions/italic'
import link from './toolbarFunctions/link'
import strikethrough from './toolbarFunctions/strikethrough'
import underline from './toolbarFunctions/underline'


interface Props {
    editor: Editor | null
}

const getHeadingLevel = (editor: Editor) => {
    // Can't find a better way to do this.
    if (editor.isActive('paragraph')) return 0
    if (editor.isActive('heading', { level: 1 })) return 1
    if (editor.isActive('heading', { level: 2 })) return 2
    if (editor.isActive('heading', { level: 3 })) return 3
    if (editor.isActive('heading', { level: 4 })) return 4
    if (editor.isActive('heading', { level: 5 })) return 5
    if (editor.isActive('heading', { level: 6 })) return 6
    return null
}

export default ({ editor }: Props) => {
    const headingLevel = editor ? getHeadingLevel(editor) : null

    const headingOnChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        const selectElement = event.target as HTMLSelectElement

        if (selectElement.value === '') return

        const level = parseInt(selectElement.value) as 0 | 1 | 2 | 3 | 4 | 5 | 6
        heading(editor)(level)
    }

    return (
        <div>
            <button onClick={bold(editor)}>Bold</button>
            <button onClick={italic(editor)}>Italic</button>
            <button onClick={underline(editor)}>Underline</button>
            <button onClick={strikethrough(editor)}>StrikeThrough</button>
            <button onClick={code(editor)}>Code</button>
            <button onClick={blockQuote(editor)}>BlockQuote</button>
            <button onClick={codeBlock(editor)}>CodeBlock</button>
            <button onClick={link(editor)}>Link</button>
            <select value={headingLevel ?? ''} onChange={headingOnChange}>
                <option hidden />
                <option value='1'>Heading 1</option>
                <option value='2'>Heading 2</option>
                <option value='3'>Heading 3</option>
                <option value='4'>Heading 4</option>
                <option value='5'>Heading 5</option>
                <option value='6'>Heading 6</option>
                <option value='0'>Normal</option>
            </select>
            <button onClick={addUrlImage(editor)}>Add image via URL</button>
        </div>
    )
}