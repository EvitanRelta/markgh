import FileDownloadIcon from '@mui/icons-material/FileDownload'
import IconButton from '@mui/material/IconButton'


const ExportMarkdownOption = () => (
    <label style= {{ cursor: 'pointer'}}>
        <IconButton component="span" >
            <FileDownloadIcon />
        </IconButton>
        <span style={{
            paddingRight: '10px'
        }}>Export Markdown</span>
    </label>
)

export default ExportMarkdownOption