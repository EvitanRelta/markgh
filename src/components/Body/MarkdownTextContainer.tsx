import { Box, styled } from '@mui/material'
import { useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { CopyClipboardButton } from './CopyClipboardButton'

export const MarkdownTextContainer = () => {
    const markdownText = useAppSelector((state) => state.mdText)
    const [isHovering, setIsHovering] = useState(false)
    const [showCopiedPopup, setShowCopiedPopup] = useState(false)

    const StyledMdTextContainer = styled(Box)({
        width: '50%',
        border: '1px solid #d0cccc',
        padding: '20px',
        paddingTop: 15,
        paddingRight: 8,
        margin: '10px',
        overflowX: 'auto',
        marginTop: 9.5,
        borderRadius: 6.5,
    })

    return (
        <StyledMdTextContainer
            onMouseLeave={() => !showCopiedPopup && setIsHovering(false)}
            onMouseEnter={() => setIsHovering(true)}
        >
            {isHovering && (
                <CopyClipboardButton
                    setIsHovering={setIsHovering}
                    markdownText={markdownText}
                    showCopiedPopup={showCopiedPopup}
                    setShowCopiedPopup={setShowCopiedPopup}
                />
            )}
            <pre style={{ marginTop: 15, display: 'inline' }}>{markdownText}</pre>
        </StyledMdTextContainer>
    )
}
