import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import CopyClipboardButton from './CopyClipboardButton'

const MarkdownTextContainer = () => {
    const theme = useAppSelector((state) => state.theme)
    const markdownText = useAppSelector((state) => state.mdText)
    const [isHovering, setIsHovering] = useState(false)

    const [showCopiedPopup, setShowCopiedPopup] = useState(false)

    const onCopy = () => {
        navigator.clipboard.writeText(markdownText)
        popUpCopied()
    }

    const popUpCopied = () => {
        setShowCopiedPopup(true)
        setTimeout(() => setShowCopiedPopup(false), 1000)
    }

    const copyButtonColor = theme === 'dark' ? '#2a2a2a' : '#F5F5F5'

    return (
        <Box
            style={{
                width: '50%',
                border: '1px solid #d0cccc',
                padding: '20px',
                paddingTop: 15,
                paddingRight: 8,
                margin: '10px',
                overflowX: 'auto',
                marginTop: 9.5,
                borderRadius: 6.5,
            }}
            onMouseLeave={() => setIsHovering(false)}
            onMouseEnter={() => setIsHovering(true)}
        >
            {isHovering && (
                <Box
                    style={{
                        margin: 0,
                        right: 23,
                        top: 151,
                        position: 'absolute',
                        backgroundColor: copyButtonColor,
                        borderRadius: 7,
                        paddingBottom: 1,
                        zIndex: 1000,
                    }}
                >
                    {showCopiedPopup ? (
                        <Button
                            sx={{
                                display: 'inline',
                            }}
                        >
                            Copied
                        </Button>
                    ) : (
                        <CopyClipboardButton onClick={onCopy} />
                    )}
                </Box>
            )}
            <pre style={{ marginTop: 15, display: 'inline' }}>{markdownText}</pre>
        </Box>
    )
}

export default MarkdownTextContainer
