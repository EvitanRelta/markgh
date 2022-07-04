import { FileDownload as FileDownloadIcon } from '@mui/icons-material'
import { Box, IconButton, MenuItem } from '@mui/material'

interface Props {
    onDownload: () => void
}

export const ExportFile = ({ onDownload }: Props) => {
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
