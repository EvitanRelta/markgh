import TextEditor from '../Editor/TextEditor'
import MarkdownTextContainer from './MarkdownTextContainer'

type Props = {
    showMarkdown: boolean
    mdText: string
    onTextChange: (editorContainer: HTMLElement) => void | null
    theme: 'light' | 'dark'
}

const Body = ({ showMarkdown, mdText, onTextChange, theme }: Props) => {
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
                    <TextEditor theme={theme} onTextChange={onTextChange} />
                </div>
                {showMarkdown && <MarkdownTextContainer mdText={mdText} theme={theme} />}
            </div>
        </div>
    )
}

export default Body
