import { Menu, MenuItem } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import { GithubAuthProvider } from 'firebase/auth'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { toggleTheme } from '../../store/themeSlice'
import { githubProvider } from '.././Authentication/config/authMethod'
import Login from './MenuOptions/Login'
import Logout from './MenuOptions/Logout'
import ThemeOption from './MenuOptions/ThemeOption'
import UserInfo from './MenuOptions/UserInfo'

type Props = {
    title: string
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    onLogin: (provider: GithubAuthProvider) => Promise<string | void>
    onLogout: () => Promise<void>
}

const MenuButton = ({ title, onUpload, onLogin, onLogout }: Props) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user)

    const [anchor, setAnchor] = useState<(EventTarget & Element) | null>(null)
    //const [selected, setSelected] = useState(-1)

    const openMenu = (e: React.MouseEvent) => {
        setAnchor(e.currentTarget)
    }

    const closeMenu = () => {
        setAnchor(null)
    }

    const handleChangeTheme = () => {
        dispatch(toggleTheme())
        closeMenu()
    }

    const userPhoto = user.user === null ? '' : (user.user.photoURL as string)

    return (
        <Box>
            <Avatar
                src={userPhoto}
                sx={{
                    width: 35,
                    height: 35,
                    marginRight: 1,
                    marginTop: 1,
                    cursor: 'pointer',
                    border: '2px solid #1976d2',
                }}
                onClick={openMenu}
            />
            <Menu open={Boolean(anchor)} keepMounted anchorEl={anchor} onClose={closeMenu}>
                {user.loggedIn && <UserInfo />}
                <MenuItem onClick={() => (user.loggedIn ? onLogout() : onLogin(githubProvider))}>
                    {user.loggedIn ? <Logout /> : <Login />}
                </MenuItem>
                <MenuItem onClick={handleChangeTheme}>
                    <ThemeOption />
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default MenuButton
