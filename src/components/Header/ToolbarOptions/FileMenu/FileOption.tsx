import { Box, Button, Menu, styled } from '@mui/material'
import { useState } from 'react'
import { ExportFile } from './ExportFile'
import { ImportGHRepo } from './ImportGHRepo'
import { OpenFile } from './OpenFile'

interface Props {
    onDownload: () => void
}

const StyledFileOptionContainer = styled(Box)({
    display: 'inline-block',
})

export const FileOption = ({ onDownload }: Props) => {
    const [anchor, setAnchor] = useState<(EventTarget & Element) | null>(null)

    const openMenu = (e: React.MouseEvent) => setAnchor(e.currentTarget)
    const closeMenu = () => setAnchor(null)

    return (
        <StyledFileOptionContainer>
            <Button style={{ padding: 0 }} onClick={openMenu}>
                File
            </Button>
            <Menu open={Boolean(anchor)} keepMounted anchorEl={anchor} onClose={closeMenu}>
                <OpenFile />
                <ImportGHRepo menuOpen={Boolean(anchor)} setAnchor={setAnchor} />
                <ExportFile onDownload={onDownload} />
            </Menu>
        </StyledFileOptionContainer>
    )
}
