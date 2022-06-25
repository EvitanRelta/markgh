import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { EditorDB } from '../../../IndexedDB/initDB'

type Props = {
    onDownload: () => void
    db: EditorDB
}

const FileOption = ({ onDownload, db }: Props) => {
    const [anchor, setAnchor] = useState<(EventTarget & Element) | null>(null)

    const openMenu = (e: React.MouseEvent) => {
        setAnchor(e.currentTarget)
    }

    const closeMenu = () => {
        setAnchor(null)
    }

    return (
        <Box sx={{ display: 'inline-block' }}>
            <Button style={{ padding: 3 }} onClick={openMenu}>
                Snapshots
            </Button>
        </Box>
    )
}

export default FileOption
