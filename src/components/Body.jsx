import TextEditor from "./TextEditor";
import MarkdownText from "./MarkdownText";
import IconButton from '@mui/material/IconButton';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Input from '@mui/material/Input';
import { useState, useRef } from 'react'



const Body = ({showMarkdown}) => {

    const [fileName, setFileName] = useState('No File Chosen')
    const editorWidth = showMarkdown ? '50%' : '100%'


    const onUpload = (e) => {
        setFileName(e.target.files[0].name)
    }

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
            <label style = {{ color: 'gray', paddingLeft: '10px'}}>
                <div style = {{ display: 'none'}}>
                    <Input type="file" accept="file/*" onChange = { onUpload }/> 
                </div>
                <IconButton  component = "span">
                    <FileUploadIcon />
                </IconButton> { fileName }
            </label>
        </div>
    )
}

export default Body