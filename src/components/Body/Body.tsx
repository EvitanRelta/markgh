import Box from '@mui/material/Box'
import TextEditor from '../Editor/TextEditor'
import MarkdownTextContainer from './MarkdownTextContainer'

type Props = {
    showMarkdown: boolean
    onTextChange: (editorContainer: Element) => void | null
}

const Body = ({ showMarkdown, onTextChange }: Props) => {
    const editorWidth = showMarkdown ? '50%' : '100%'

    return (
        <Box>
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
        </Box>
    )
}

export default Body
