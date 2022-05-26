import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const ExportMarkdownOption = () => {
    
  return (
            <label>
                <IconButton component = "span" >
                    <FileDownloadIcon />
                </IconButton>
                <span style = {{
                    paddingRight: '10px'  
                }}>Export Markdown</span>
            </label>
  )
}

export default ExportMarkdownOption