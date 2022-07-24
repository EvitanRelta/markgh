import { Box, styled } from '@mui/material'
import { useAppSelector } from '../../store/hooks'
import { TextEditor } from '../Editor/TextEditor'
import { MarkdownTextContainer } from './MarkdownTextContainer'

const StyledContentContainer = styled(Box)({
    justifyContent: 'center',
    alignItems: 'stretch',
    display: 'flex',
    top: 140,
    position: 'relative',
})

const StyledEditorContianer = styled(Box)({
    margin: '10px',
    height: 'stretch',
})

export const Body = () => {
    const showMarkdown = useAppSelector((state) => state.data.showMarkdown)

    const editorWidth = showMarkdown ? '50%' : '100%'

    return (
        <>
            <StyledContentContainer>
                <StyledEditorContianer sx={{ width: editorWidth }}>
                    <TextEditor />
                </StyledEditorContianer>
                {showMarkdown && <MarkdownTextContainer />}
            </StyledContentContainer>
        </>
    )
}
