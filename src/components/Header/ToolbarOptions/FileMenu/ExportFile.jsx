import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { MenuItem } from '@mui/material'
import IconButton from '@mui/material/IconButton'

const ExportFile = ({ onDownload }) => {
    return (
        <MenuItem style={{ padding: 0 }} onClick={onDownload}>
            <label style={{ cursor: 'pointer' }}>
                <div
                    style={{
                        display: 'inline-block',
                        marginRight: 6,
                        paddingLeft: 11,
                    }}
                >
                    <IconButton component='span'>
                        <FileDownloadIcon />
                    </IconButton>
                </div>
                <span>Export Markdown</span>
            </label>
        </MenuItem>
    )
}

export default ExportFile
