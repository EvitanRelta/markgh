import { Box, styled } from '@mui/material'
import { useAppSelector } from '../../store/hooks'
import { EditorToolbar } from '../Editor/EditorToolbar'
import { TextEditor } from '../Editor/TextEditor'
import { MarkdownTextContainer } from './MarkdownTextContainer'

interface Props {
    showMarkdown: boolean
    onTextChange: (editorContainer: Element) => void | null
}

const StyledContentContainer = styled(Box)({
    justifyContent: 'center',
    alignItems: 'stretch',
    display: 'flex',
})

const StyledEditorContianer = styled(Box)({
    margin: '10px',
    height: 'stretch',
})

export const Body = ({ showMarkdown, onTextChange }: Props) => {
    const editorWidth = showMarkdown ? '50%' : '100%'
    const editor = useAppSelector((state) => state.data.editor)

    return (
        <>
            <EditorToolbar editor={editor} />
            <StyledContentContainer>
                <StyledEditorContianer sx={{ width: editorWidth }}>
                    <TextEditor onTextChange={onTextChange} />
                </StyledEditorContianer>
                {showMarkdown && <MarkdownTextContainer />}
            </StyledContentContainer>
        </>
    )
}
