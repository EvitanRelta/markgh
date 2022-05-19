import TextEditor from "./TextEditor";
import MarkdownText from "./MarkdownText";
import IconButton from '@mui/material/IconButton';
import FileUploadIcon from '@mui/icons-material/FileUpload';



const Body = ({showMarkdown}) => {

    const editorWidth = showMarkdown ? '50%' : '100%'

  return (
    <div>
        <div style = {{
            justifyContent: 'center',
            alignItems: 'stretch',
            display: 'flex'
        }}>
            <div style = {{
                    margin: '10px',
                    width: editorWidth,
                    height: 'stretch'
                    }}><TextEditor/></div>
            
            {showMarkdown && <MarkdownText  markdown = 'test'/>}
        </div>
        <p><IconButton>
                <FileUploadIcon/>
                </IconButton>
        </p>
    </div>
  )
}

export default Body