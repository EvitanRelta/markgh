import { FileDownload as FileDownloadIcon } from '@mui/icons-material'
import { Box, MenuItem, styled } from '@mui/material'

interface Props {
    onDownload: () => void
}

const StyledMenuItem = styled(MenuItem)({
    padding: 10,
    marginTop: 2,
})

const StyledDownloadIcon = styled(FileDownloadIcon)({
    marginLeft: 10,
    marginRight: 10,
})

const StyledText = styled(Box)({
    display: 'inline',
})

export const ExportFile = ({ onDownload }: Props) => {
    return (
        <StyledMenuItem onClick={onDownload}>
            <StyledDownloadIcon />
            <StyledText>Export Markdown</StyledText>
        </StyledMenuItem>
    )
}
