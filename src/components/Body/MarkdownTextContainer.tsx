import { Box, Button, styled } from '@mui/material'
import { useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { CopyClipboardButton } from './CopyClipboardButton'

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

const StyledCopyClipboardContainer = styled(Box)({
    margin: 0,
    right: 23,
    top: 20,
    position: 'absolute',
    borderRadius: 7,
    paddingBottom: 1,
    zIndex: 3,
})

const StyledCopiedButton = styled(Button)({
    display: 'inline',
})

const StyledMdText = styled('pre')({
    marginTop: 15,
    display: 'inline',
})

export const MarkdownTextContainer = () => {
    const theme = useAppSelector((state) => state.theme)
    const markdownText = useAppSelector((state) => state.data.markdownText)
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
        <StyledMdTextContainer
            onMouseLeave={() => !showCopiedPopup && setIsHovering(false)}
            onMouseEnter={() => setIsHovering(true)}
        >
            {isHovering && (
                <StyledCopyClipboardContainer sx={{ backgroundColor: copyButtonColor }}>
                    {showCopiedPopup ? (
                        <StyledCopiedButton>Copied</StyledCopiedButton>
                    ) : (
                        <CopyClipboardButton onClick={onCopy} />
                    )}
                </StyledCopyClipboardContainer>
            )}
            <StyledMdText>{markdownText}</StyledMdText>
        </StyledMdTextContainer>
    )
}
