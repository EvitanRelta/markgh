import { Menu } from '@mui/material'
import Button from '@mui/material/Button'
import { useState } from 'react'
import ExportFile from './ExportFile'
import OpenFile from './OpenFile'

type Props = {
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const OpenFileOption = ({ onUpload }: Props) => {
    const [anchor, setAnchor] = useState<(EventTarget & Element) | null>(null)

    const openMenu = (e: React.MouseEvent) => {
        setAnchor(e.currentTarget)
    }

    const closeMenu = () => {
        setAnchor(null)
    }

    return (
        <div style={{ display: 'inline-block' }}>
            <Button style={{ padding: 0 }} onClick={openMenu}>
                File
            </Button>
            <Menu
                open={Boolean(anchor)}
                keepMounted
                anchorEl={anchor}
                onClose={closeMenu}
            >
                <OpenFile onUpload={onUpload} />
                <ExportFile />
            </Menu>
        </div>
    )
}

export default OpenFileOption
