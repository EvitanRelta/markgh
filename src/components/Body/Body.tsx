import TextEditor from '../Editor/TextEditor'
import MarkdownTextContainer from './MarkdownTextContainer'

type Props = {
    showMarkdown: boolean
    onTextChange: (editorContainer: HTMLElement) => void | null
}

const Body = ({ showMarkdown, onTextChange }: Props) => {
    const editorWidth = showMarkdown ? '50%' : '100%'

    return (
        <div>
            <div
                style={{
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    display: 'flex',
                }}
            >
                <div
                    style={{
                        margin: '10px',
                        width: editorWidth,
                        height: 'stretch',
                    }}
                >
                    <TextEditor onTextChange={onTextChange} />
                </div>
                {showMarkdown && <MarkdownTextContainer />}
            </div>
        </div>
    )
}

export default Body
