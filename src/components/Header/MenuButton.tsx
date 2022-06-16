import { Menu, MenuItem } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { GithubAuthProvider } from 'firebase/auth'
import { useState } from 'react'
import { githubProvider } from '.././Authentication/config/authMethod'
import Login from './MenuOptions/Login'
import Logout from './MenuOptions/Logout'
import ThemeOption from './MenuOptions/ThemeOption'

type Props = {
    theme: string
    toggleTheme: () => void
    title: string
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    onLogin: (provider: GithubAuthProvider) => Promise<void>
    onLogout: () => Promise<void>
    loggedIn: boolean
}

const MenuButton = ({
    theme,
    toggleTheme,
    title,
    onUpload,
    onLogin,
    onLogout,
    loggedIn,
}: Props) => {
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
            <Avatar src='' sx={{ width: 24, height: 24 }} onClick={openMenu} />
            <Menu open={Boolean(anchor)} keepMounted anchorEl={anchor} onClose={closeMenu}>
                <MenuItem onClick={() => (loggedIn ? onLogout() : onLogin(githubProvider))}>
                    {loggedIn ? <Logout /> : <Login />}
                </MenuItem>
                <MenuItem onClick={handleChangeTheme}>
                    <ThemeOption theme={theme} />
                </MenuItem>
            </Menu>
        </div>
    )
}

export default MenuButton
