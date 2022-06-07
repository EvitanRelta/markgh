import { Editor } from '@tiptap/react'
import heading from './toolbarFunctions/heading'


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

    const onChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        const selectElement = event.target as HTMLSelectElement

        if (selectElement.value === '') return

        const level = parseInt(selectElement.value) as 0 | 1 | 2 | 3 | 4 | 5 | 6
        heading(editor)(level)
    }

    return (
        <select value={headingLevel ?? ''} onChange={onChange}>
            <option hidden />
            <option value='1'>Heading 1</option>
            <option value='2'>Heading 2</option>
            <option value='3'>Heading 3</option>
            <option value='4'>Heading 4</option>
            <option value='5'>Heading 5</option>
            <option value='6'>Heading 6</option>
            <option value='0'>Normal</option>
        </select>
    )
}