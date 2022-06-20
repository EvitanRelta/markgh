import FileDownloadIcon from '@mui/icons-material/FileDownload'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

const ExportMarkdownOption = () => (
    <Box style={{ cursor: 'pointer' }}>
        <IconButton>
            <FileDownloadIcon />
        </IconButton>
        <Box
            style={{
                paddingRight: '10px',
            }}
        >
            Export Markdown
        </Box>
    </Box>
)

export default ExportMarkdownOption
