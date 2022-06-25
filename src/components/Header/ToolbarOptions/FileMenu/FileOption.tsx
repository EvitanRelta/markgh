import { Box, Menu } from '@mui/material'
import Button from '@mui/material/Button'
import { useState } from 'react'
import ExportFile from './ExportFile'
import ImportGHRepo from './ImportGHRepo'
import OpenFile from './OpenFile'

type Props = {
    onDownload: () => void
}

const FileOption = ({ onDownload }: Props) => {
    const [anchor, setAnchor] = useState<(EventTarget & Element) | null>(null)

    const openMenu = (e: React.MouseEvent) => {
        setAnchor(e.currentTarget)
    }

    const closeMenu = () => {
        setAnchor(null)
    }

    return (
        <Box id='file-button' style={{ display: 'inline-block' }}>
            <Button style={{ padding: 0 }} onClick={openMenu}>
                File
            </Button>
            <Menu
                open={Boolean(anchor)}
                keepMounted
                anchorEl={document.getElementById('file-button')}
                onClose={closeMenu}
            >
                <OpenFile />
                <ImportGHRepo menuOpen={Boolean(anchor)} setAnchor={setAnchor} />
                <ExportFile onDownload={onDownload} />
            </Menu>
        </Box>
    )
}

export default FileOption
