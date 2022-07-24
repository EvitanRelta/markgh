import { Box, styled } from '@mui/material'
import { useAppSelector } from '../../store/hooks'
import { EditorToolbar } from '../Editor/EditorToolbar'
import { TextEditor } from '../Editor/TextEditor'
import { MarkdownTextContainer } from './MarkdownTextContainer'

const StyledContentContainer = styled(Box)({
    justifyContent: 'center',
    alignItems: 'stretch',
    display: 'flex',
})

const StyledEditorContianer = styled(Box)({
    margin: '10px',
    height: 'stretch',
})

export const Body = () => {
    const editor = useAppSelector((state) => state.data.editor)
    const showMarkdown = useAppSelector((state) => state.data.showMarkdown)

    const editorWidth = showMarkdown ? '50%' : '100%'

    return (
        <>
            <EditorToolbar />
            <StyledContentContainer>
                <StyledEditorContianer sx={{ width: editorWidth }}>
                    <TextEditor />
                </StyledEditorContianer>
                {showMarkdown && <MarkdownTextContainer />}
            </StyledContentContainer>
        </>
    )
}
