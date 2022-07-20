import { Box, Button, Menu, styled, Tooltip } from '@mui/material'
import { useState } from 'react'
import { DownloadMarkdown } from './DownloadMarkdown'
import { PushGH } from './PushGH'

const StyledExportOptionContainer = styled(Box)({
    display: 'inline-block',
})

const StyledExportOptionButton = styled(Button)({
    padding: 3,
})

export const ExportOption = () => {
    const [anchor, setAnchor] = useState<(EventTarget & Element) | null>(null)

    const openMenu = (e: React.MouseEvent) => setAnchor(e.currentTarget)
    const closeMenu = () => setAnchor(null)

    return (
        <StyledExportOptionContainer>
            <Tooltip title='Export Options' disableInteractive arrow>
                <StyledExportOptionButton onClick={openMenu}>Export</StyledExportOptionButton>
            </Tooltip>
            <Menu open={Boolean(anchor)} keepMounted anchorEl={anchor} onClose={closeMenu}>
                <PushGH />
                <DownloadMarkdown />
            </Menu>
        </StyledExportOptionContainer>
    )
}
