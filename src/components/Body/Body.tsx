import { Box } from '@mui/material'
import { useAppSelector } from '../../store/hooks'
import { EditorToolbar } from '../Editor/EditorToolbar'
import { TextEditor } from '../Editor/TextEditor'
import { MarkdownTextContainer } from './MarkdownTextContainer'

interface Props {
    showMarkdown: boolean
    onTextChange: (editorContainer: Element) => void | null
}

export const Body = ({ showMarkdown, onTextChange }: Props) => {
    const editorWidth = showMarkdown ? '50%' : '100%'
    const editor = useAppSelector((state) => state.editor.editor)

    return (
        <>
            <EditorToolbar editor={editor} />
            <Box
                style={{
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    display: 'flex',
                }}
            >
                <Box
                    style={{
                        margin: '10px',
                        width: editorWidth,
                        height: 'stretch',
                    }}
                >
                    <TextEditor onTextChange={onTextChange} />
                </Box>
                {showMarkdown && <MarkdownTextContainer />}
            </Box>
        </>
    )
}
