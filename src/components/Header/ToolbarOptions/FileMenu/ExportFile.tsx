import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

interface Props {
    onDownload: () => void
}

const ExportFile = ({ onDownload }: Props) => {
    return (
        <MenuItem style={{ padding: 0, marginTop: 2 }} onClick={onDownload}>
            <Box style={{ cursor: 'pointer' }}>
                <Box
                    style={{
                        display: 'inline',
                        marginRight: 6,
                        paddingLeft: 11,
                    }}
                >
                    <IconButton>
                        <FileDownloadIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'inline' }}>Export Markdown</Box>
            </Box>
        </MenuItem>
    )
}

export default ExportFile
