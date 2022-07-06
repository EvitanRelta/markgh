import { Box, styled } from '@mui/material'
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

const StyledMdText = styled('pre')({
    marginTop: 15,
    display: 'inline',
})

export const MarkdownTextContainer = () => {
    const markdownText = useAppSelector((state) => state.mdText)
    const [isHovering, setIsHovering] = useState(false)

    return (
        <StyledMdTextContainer
            onMouseLeave={() => setIsHovering(false)}
            onMouseEnter={() => setIsHovering(true)}
        >
            {isHovering && (
                <CopyClipboardButton isHovering={isHovering} markdownText={markdownText} />
            )}
            <StyledMdText>{markdownText}</StyledMdText>
        </StyledMdTextContainer>
    )
}
