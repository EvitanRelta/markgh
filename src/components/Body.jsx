import TextEditor from "./TextEditor";
import MarkdownText from "./MarkdownText";
import IconButton from '@mui/material/IconButton';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Input from '@mui/material/Input';
import { useState, } from 'react'



const Body = ({showMarkdown, title}) => {

    const [fileName, setFileName] = useState('No File Chosen')
    const [textValue, setTextValue] = useState('')
    const editorWidth = showMarkdown ? '50%' : '100%'


    const onUpload = (e) => {
        const allowedFileTypes = ['txt', 'md']
        const file = e.target.files[0]

        const reader = new FileReader();

        const getFileType = (fileName) => {
            return fileName.split('.').pop().toLowerCase()
        }

        if (!allowedFileTypes.includes(getFileType(file.name)) ) {
            setFileName('Uploaded file is not a .txt or .md file!')
            setTextValue('Invalid file type!')
            return
        }

        setFileName(file.name)
        reader.readAsText(file);
        reader.onload = () => {
            setTextValue(reader.result)
        }
    }

    const onDownload = () => {
        const element = document.createElement("a");
        const file = new Blob(['test export'], {type: "text/plain;charset=utf-8"})
        element.href = URL.createObjectURL(file)    ;
        element.download = (title === '' ? "NewFile" : title) + ".md";
        document.body.appendChild(element);
        element.click()
    }

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
                
                {showMarkdown && <MarkdownText  markdown = {textValue} />}
            </div>
            <div style = {{
                justifyContent: 'space-between',
                display: 'flex'
               }}>
                <label style = {{ color: 'gray', paddingLeft: '10px'}}>
                    <div style = {{ display: 'none'}}>
                        <Input type="file" accept="file/*" onChange = { onUpload }/> 
                    </div>
                    <IconButton  component = "span">
                        <FileUploadIcon />
                    </IconButton> { fileName }
                </label>
                <label>
                    <IconButton component = "span" onClick = {onDownload}>
                        <FileDownloadIcon />
                    </IconButton>
                    <span style = {{
                        color: 'gray',
                        paddingRight: '10px'
                        
                    }}>Export Markdown</span>
                </label>

            </div>
        </div>
    )
}

export default Body