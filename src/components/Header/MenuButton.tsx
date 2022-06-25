import { Menu, MenuItem } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { loginUser, logoutUser } from '../../store/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { toggleTheme } from '../../store/themeSlice'
import Login from './MenuOptions/Login'
import Logout from './MenuOptions/Logout'
import ThemeOption from './MenuOptions/ThemeOption'
import UserInfo from './MenuOptions/UserInfo'

type Props = {
    title: string
}

const MenuButton = ({ title }: Props) => {
    const dispatch = useAppDispatch()
    const auth = useAppSelector((state) => state.auth)

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

    const handleLoginLogout = () => {
        if (auth.loggedIn) dispatch(logoutUser())
        else dispatch(loginUser())
    }

    const userPhoto = auth.user && auth.user.photoURL ? auth.user.photoURL : undefined

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
                {auth.loggedIn && <UserInfo />}
                <MenuItem onClick={handleLoginLogout}>
                    {auth.loggedIn ? <Logout /> : <Login />}
                </MenuItem>
                <MenuItem onClick={handleChangeTheme}>
                    <ThemeOption />
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default MenuButton
