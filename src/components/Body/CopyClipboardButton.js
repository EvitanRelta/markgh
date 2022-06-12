import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { IconButton } from '@mui/material'

const CopyClipboardButton = ({ onClick }) => {
    return (
        <div
            style={{
                marginTop: 6,
                border: '1px solid #d0cccc',
                padding: 0,
                borderRadius: 5,
                maxHeight: 37,
            }}
        >
            <IconButton
                onClick={onClick}
                color='inherit'
                size='small'
                sx={{ transform: 'scaleX(-1) scale(0.8)' }}
            >
                <ContentCopyIcon />
            </IconButton>
        </div>
    )
}

export default CopyClipboardButton
