import Quill from 'quill'
import MarkdownTextContainer from './MarkdownTextContainer'
import TextEditor from './TextEditor'

type Props = {
    showMarkdown: boolean
    mdText: string
    setQuill: React.Dispatch<React.SetStateAction<Quill | null>>
    theme: 'light' | 'dark'
}

const Body = ({ showMarkdown, mdText, setQuill, theme }: Props) => {
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
                    <TextEditor setQuill={setQuill} theme={theme} />
                </div>
                {showMarkdown && (
                    <MarkdownTextContainer mdText={mdText} theme={theme} />
                )}
            </div>
        </div>
    )
}

export default Body
