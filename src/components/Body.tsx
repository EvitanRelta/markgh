import Quill from 'quill'
import MarkdownText from "./MarkdownText"
import TextEditor from "./TextEditor"

type Props = {
    showMarkdown: boolean;
    mdText: string;
    setQuill: React.Dispatch<React.SetStateAction<Quill | null>>;
}


const Body = ({ showMarkdown, mdText, setQuill }: Props) => {
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
                    <TextEditor setQuill={setQuill} />
                </div>
                {showMarkdown && <MarkdownText mdText={mdText} />}
            </div>

        </div>
    )
}

export default Body