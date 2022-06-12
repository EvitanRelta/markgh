import Button from '@mui/material/Button'
import { useState } from 'react'
import CopyClipboardButton from './CopyClipboardButton'

type Props = {
    mdText: string
}

const MarkdownTextContainer = ({ mdText }: Props) => {
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

    return (
        <div
            style={{
                width: '50%',
                border: '1px solid #d0cccc',
                padding: '20px',
                paddingTop: 2,
                paddingRight: 8,
                margin: '10px',
                overflowX: 'auto',
                justifyContent: 'space-between',
                display: 'flex',
            }}
            onMouseLeave={() => setIsHovering(false)}
            onMouseEnter={() => setIsHovering(true)}
        >
            <pre style={{ marginTop: 15 }}>{mdText}</pre>
            {isHovering && (
                <div>
                    {showCopiedPopup ? (
                        <Button sx={{ marginTop: 1, marginRight: 0.5 }}>
                            Copied
                        </Button>
                    ) : (
                        <CopyClipboardButton onClick={onCopy} />
                    )}
                </div>
            )}
        </div>
    )
}

export default MarkdownTextContainer
