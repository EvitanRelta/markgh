import { Editor } from '@tiptap/react'
import textAlign from './toolbarFunctions/textAlign'

interface Props {
    editor: Editor | null
}

export default ({ editor }: Props) => {
    const onChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        const selectElement = event.target as HTMLSelectElement

        if (selectElement.value === '') return

        textAlign(editor)(selectElement.value as 'left' | 'center' | 'right' | 'justify')
    }

    return (
        <select value='' onChange={onChange}>
            <option hidden>Alignment</option>
            <option value='left'>Left</option>
            <option value='center'>Center</option>
            <option value='right'>Right</option>
            <option value='justify'>Justify</option>
        </select>
    )
}
