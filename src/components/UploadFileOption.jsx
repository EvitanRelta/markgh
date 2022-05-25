import IconButton from '@mui/material/IconButton';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Input from '@mui/material/Input';
import { useState, } from 'react'

const UploadFileOption = ({onUpload}) => {
    
  return (
            <label style = {{
                paddingLeft: "16px",
                paddingTop: "5px",
                paddingBottom: "5px",
                minWidth: "208.75px"
            }}>
                <div style = {{ display: 'none'}}>
                    <Input type="file" accept="file/*" onChange = { onUpload }/> 
                </div>  
                <IconButton  component = "span">
                    <FileUploadIcon />
                </IconButton> 
                Upload File
            </label>

  )
}

export default UploadFileOption