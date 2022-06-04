import TextEditor from "./Editor/TextEditor"
import MarkdownText from "./MarkdownText"


const Body = ({ showMarkdown, mdText, onTextChange, theme }) => {
    const editorWidth = showMarkdown ? '50%' : '100%'


    return (
        <div >
            <div style={{
                justifyContent: 'center',
                alignItems: 'stretch',
                display: 'flex'
            }}>
                <div style={{
                    margin: '10px',
                    width: editorWidth,
                    height: 'stretch'
                }}>
                    <TextEditor theme={theme} onTextChange={onTextChange} />
                </div>
                {showMarkdown && <MarkdownText mdText={mdText} />}
            </div>

        </div>
    )
}

export default Body