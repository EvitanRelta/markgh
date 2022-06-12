import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Menu, MenuItem } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'
import ThemeOption from './MenuOptions/ThemeOption'

type Props = {
    theme: string
    toggleTheme: React.MouseEventHandler<HTMLButtonElement | HTMLElement>
    title: string
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const MenuButton = ({ theme, toggleTheme, title, onUpload }: Props) => {
    const [anchor, setAnchor] = useState<(EventTarget & Element) | null>(null)
    //const [selected, setSelected] = useState(-1)

    const openMenu = (e: React.MouseEvent) => {
        setAnchor(e.currentTarget)
    }

    const closeMenu = () => {
        setAnchor(null)
    }

    return (
        <div>
            <IconButton onClick={openMenu}>
                <MoreHorizIcon />
            </IconButton>
            <Menu
                open={Boolean(anchor)}
                keepMounted
                anchorEl={anchor}
                onClose={closeMenu}
            >
                <MenuItem onClick={toggleTheme}>
                    <ThemeOption theme={theme} />
                </MenuItem>
            </Menu>
        </div>
    )
}

export default MenuButton
