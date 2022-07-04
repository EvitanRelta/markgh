import { ContentCopy as ContentCopyIcon } from '@mui/icons-material'
import { Box, Button, IconButton, styled } from '@mui/material'
import { useState } from 'react'
import { useAppSelector } from '../../store/hooks'

interface Props {
    isHovering: boolean
    markdownText: string
}

export const CopyClipboardButton = ({ isHovering, markdownText }: Props) => {
    const [showCopiedPopup, setShowCopiedPopup] = useState(false)
    const theme = useAppSelector((state) => state.theme)

    const copyButtonColor = theme === 'dark' ? '#2a2a2a' : '#F5F5F5'

    const StyledHoverContainer = styled(Box)({
        margin: 0,
        right: 21,
        top: 156,
        position: 'absolute',
        backgroundColor: copyButtonColor,
        borderRadius: 7,
        paddingBottom: 1,
        zIndex: 1000,
    })
    const StyledClipboardIconContainer = styled(Box)({
        marginTop: 6,
        padding: 2,
        paddingTop: 6,
        borderRadius: 5,
        display: 'inline',
    })
    const StyledIconButton = styled(IconButton)({
        transform: 'scaleX(-1) scale(0.8)',
    })

    const StyledCopiedPrompt = styled(Button)({
        display: 'inline-flex',
    })

    const copiedPopup = <StyledCopiedPrompt> COPIED </StyledCopiedPrompt>

    const onCopy = () => {
        navigator.clipboard.writeText(markdownText)
        popUpCopied()
    }

    const popUpCopied = () => {
        setShowCopiedPopup(true)
        setTimeout(() => setShowCopiedPopup(false), 1000)
    }

    return (
        <StyledHoverContainer>
            <StyledClipboardIconContainer>
                {showCopiedPopup ? (
                    copiedPopup
                ) : (
                    <StyledIconButton onClick={onCopy} size='small'>
                        <ContentCopyIcon />
                    </StyledIconButton>
                )}
            </StyledClipboardIconContainer>
        </StyledHoverContainer>
    )
}
