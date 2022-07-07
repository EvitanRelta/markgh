import { ContentCopy as ContentCopyIcon } from '@mui/icons-material'
import { Box, IconButton, styled } from '@mui/material'

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

const StyledButtonContainer = styled(Box)({
    marginTop: 6,
    padding: 2,
    paddingTop: 6,
    borderRadius: 5,
    display: 'inline',
})

const StyledIconButton = styled(IconButton)({
    transform: 'scaleX(-1) scale(0.8)',
})

export const CopyClipboardButton = ({ onClick }: Props) => {
    return (
        <StyledButtonContainer>
            <StyledIconButton onClick={onClick} color='inherit' size='small'>
                <ContentCopyIcon />
            </StyledIconButton>
        </StyledButtonContainer>
    )
}
