import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Menu, MenuItem } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { GithubAuthProvider } from 'firebase/auth'
import { useState } from 'react'
import { githubProvider } from '.././Authentication/config/authMethod'
import Login from './MenuOptions/Login'
import ThemeOption from './MenuOptions/ThemeOption'

type Props = {
    theme: string
    toggleTheme: () => void
    title: string
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    onLogin: (provider: GithubAuthProvider) => Promise<void>
    onLogout: () => Promise<void>
}

const MenuButton = ({ theme, toggleTheme, title, onUpload, onLogin, onLogout }: Props) => {
    const [anchor, setAnchor] = useState<(EventTarget & Element) | null>(null)
    //const [selected, setSelected] = useState(-1)

    const openMenu = (e: React.MouseEvent) => {
        setAnchor(e.currentTarget)
    }

    const closeMenu = () => {
        setAnchor(null)
    }

    const handleChangeTheme = () => {
        toggleTheme()
        closeMenu()
    }

    return (
        <div>
            <IconButton onClick={openMenu}>
                <AccountCircleIcon />
            </IconButton>
            <Menu open={Boolean(anchor)} keepMounted anchorEl={anchor} onClose={closeMenu}>
                <MenuItem onClick={() => onLogin(githubProvider)}>
                    <Login />
                </MenuItem>
                <MenuItem onClick={handleChangeTheme}>
                    <ThemeOption theme={theme} />
                </MenuItem>
            </Menu>
        </div>
    )
}

export default MenuButton
