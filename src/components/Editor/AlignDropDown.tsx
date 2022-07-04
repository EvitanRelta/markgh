import {
    ExpandMore as ExpandMoreIcon,
    FormatAlignLeft as FormatAlignLeftIcon,
} from '@mui/icons-material'
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import { Editor } from '@tiptap/react'
import { useState } from 'react'
import { textAlign } from './toolbarFunctions'

type Alignment = 'left' | 'center' | 'right' | 'justify'

interface Props {
    editor: Editor | null
}

export const AlignDropDown = ({ editor }: Props) => {
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
        <Box style={{ display: 'inline' }}>
            <IconButton
                onClick={openMenu}
                sx={{
                    transition: 'none',
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
        </Box>
    )
}
