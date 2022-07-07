import {
    ExpandMore as ExpandMoreIcon,
    FormatAlignLeft as FormatAlignLeftIcon,
} from '@mui/icons-material'
import { Box, IconButton, Menu, MenuItem, styled } from '@mui/material'
import { Editor } from '@tiptap/react'
import { useState } from 'react'
import { textAlign } from './toolbarFunctions'

type Alignment = 'left' | 'center' | 'right' | 'justify'

interface Props {
    editor: Editor | null
}

const StyledAlignDropdownContainer = styled(Box)({
    display: 'inline',
})

const StyledAlignIconButton = styled(IconButton)({
    transition: 'none',
    '&:hover': {
        borderRadius: 1,
    },
})

const StyledExpandMoreIcon = styled(ExpandMoreIcon)({
    fontSize: 'medium',
})

export const AlignDropDown = ({ editor }: Props) => {
    const [anchor, setAnchor] = useState<Element | null>(null)

    const onChange = (alignment: Alignment) => {
        textAlign(editor)(alignment)
        closeMenu()
    }

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
        <StyledAlignDropdownContainer>
            <StyledAlignIconButton onClick={openMenu}>
                <FormatAlignLeftIcon />
                <StyledExpandMoreIcon />
            </StyledAlignIconButton>
            <Menu open={Boolean(anchor)} keepMounted anchorEl={anchor} onClose={closeMenu}>
                {alignOptions.map((option, index) => (
                    <MenuItem key={index} onClick={() => onChange(option)}>
                        {capitaliseFirstLetter(option)}
                    </MenuItem>
                ))}
            </Menu>
        </StyledAlignDropdownContainer>
    )
}
