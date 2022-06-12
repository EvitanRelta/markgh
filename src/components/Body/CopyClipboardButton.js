import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { IconButton } from '@mui/material'

const CopyClipboardButton = ({ onClick }) => {
    return (
        <div
            style={{
                marginTop: 6,
                padding: 2,
                paddingTop: 6,
                borderRadius: 5,
                display: 'inline',
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
