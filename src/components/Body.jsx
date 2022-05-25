import TextEditor from "./TextEditor";
import MarkdownText from "./MarkdownText";
import IconButton from '@mui/material/IconButton';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Input from '@mui/material/Input';
import { useState, } from 'react'



const Body = ({showMarkdown, mdText}) => {



    const editorWidth = showMarkdown ? '50%' : '100%'

    



    return (
        <div >
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
                
                {showMarkdown && <MarkdownText  mdText = {mdText} />}
            </div>

        </div>
    )
}

export default Body