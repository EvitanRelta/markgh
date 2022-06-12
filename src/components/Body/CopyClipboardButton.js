import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { IconButton } from '@mui/material'

const CopyClipboardButton = () => {
    return (
        <div>
            <IconButton
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
