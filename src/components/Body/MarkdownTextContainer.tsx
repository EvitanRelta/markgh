import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import CopyClipboardButton from './CopyClipboardButton'

type Props = {}

const MarkdownTextContainer = ({}: Props) => {
    const theme = useSelector((state: RootState) => state.theme)
    const mdText = useSelector((state: RootState) => state.mdText)
    const [isHovering, setIsHovering] = useState(false)

    const [showCopiedPopup, setShowCopiedPopup] = useState(false)

    const onCopy = () => {
        navigator.clipboard.writeText(mdText)
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
                marginTop: 41,
                borderRadius: 6.5,
            }}
            onMouseLeave={() => setIsHovering(false)}
            onMouseEnter={() => setIsHovering(true)}
        >
            {isHovering && (
                <Box
                    style={{
                        margin: 0,
                        right: 20,
                        top: 120,
                        position: 'absolute',
                        backgroundColor: copyButtonColor,
                        borderRadius: 7,
                        paddingBottom: 1,
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
            <pre style={{ marginTop: 15, display: 'inline' }}>{mdText}</pre>
        </Box>
    )
}

export default MarkdownTextContainer
