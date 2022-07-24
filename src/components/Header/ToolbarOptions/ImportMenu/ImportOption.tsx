import { Box, Button, Menu, styled, Tooltip } from '@mui/material'
import { useState } from 'react'
import { ImportGHRepo } from './ImportGHRepo'
import { OpenFile } from './OpenFile'

const StyledFileOptionContainer = styled(Box)({
    display: 'inline-block',
    marginLeft: 5,
    marginRight: 5,
})
const StyledImportButton = styled(Button)({
    padding: 3,
})

export const ImportOption = () => {
    const [anchor, setAnchor] = useState<(EventTarget & Element) | null>(null)

    const openMenu = (e: React.MouseEvent) => setAnchor(e.currentTarget)
    const closeMenu = () => setAnchor(null)

    return (
        <StyledFileOptionContainer>
            <Tooltip title='Import Options' disableInteractive arrow>
                <StyledImportButton onClick={openMenu}>Import</StyledImportButton>
            </Tooltip>
            <Menu open={Boolean(anchor)} keepMounted anchorEl={anchor} onClose={closeMenu}>
                <OpenFile />
                <ImportGHRepo menuOpen={Boolean(anchor)} setAnchor={setAnchor} />
            </Menu>
        </StyledFileOptionContainer>
    )
}
