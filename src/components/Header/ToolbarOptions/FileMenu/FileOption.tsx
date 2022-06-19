import { Box, Menu } from '@mui/material'
import Button from '@mui/material/Button'
import { useState } from 'react'
import ExportFile from './ExportFile'
import ImportGHRepo from './ImportGHRepo'
import OpenFile from './OpenFile'

type Props = {
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    onDownload: () => void
    ghToken: string | undefined
}

const FileOption = ({ onUpload, onDownload, ghToken }: Props) => {
    const [anchor, setAnchor] = useState<(EventTarget & Element) | null>(null)

    const openMenu = (e: React.MouseEvent) => {
        setAnchor(e.currentTarget)
    }

    const closeMenu = () => {
        setAnchor(null)
    }

    return (
        <Box style={{ display: 'inline-block' }}>
            <Button id='file-button' style={{ padding: 0 }} onClick={openMenu}>
                File
            </Button>
            <Menu
                open={Boolean(anchor)}
                keepMounted
                anchorEl={document.getElementById('file-button')}
                onClose={closeMenu}
            >
                <OpenFile onUpload={onUpload} />
                <ImportGHRepo menuOpen={Boolean(anchor)} setAnchor={setAnchor} ghToken={ghToken} />
                <ExportFile onDownload={onDownload} />
            </Menu>
        </Box>
    )
}

export default FileOption
