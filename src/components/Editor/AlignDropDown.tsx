import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import { Menu, MenuItem } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { Editor } from '@tiptap/react'
import { useState } from 'react'
import textAlign from './toolbarFunctions/textAlign'

type Alignment = 'left' | 'center' | 'right' | 'justify'

interface Props {
    editor: Editor | null
}

export default ({ editor }: Props) => {
    const onChange = (alignment: Alignment) => {
        textAlign(editor)(alignment)
        closeMenu()
    }
    const [anchor, setAnchor] = useState<Element | null>(null)

    const openMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        setAnchor(e.currentTarget)
    }

    const closeMenu = () => {
        setAnchor(null)
    }

    const alignOptions: Alignment[] = ['left', 'center', 'right', 'justify']

    const capitaliseFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.substring(1)
    }

    return (
        <div style={{ display: 'inline' }}>
            <IconButton
                onClick={openMenu}
                sx={{
                    marginTop: -1,
                    '&:hover': {
                        borderRadius: 1,
                    },
                }}
            >
                <FormatAlignLeftIcon />
                <ExpandMoreIcon sx={{ fontSize: 'medium' }} />
            </IconButton>
            <Menu open={Boolean(anchor)} keepMounted anchorEl={anchor} onClose={closeMenu}>
                {alignOptions.map((option, index) => (
                    <MenuItem key={index} onClick={() => onChange(option)}>
                        {capitaliseFirstLetter(option)}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}
