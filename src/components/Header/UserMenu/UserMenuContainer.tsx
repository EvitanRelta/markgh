import { Avatar, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { toggleTheme } from '../../../store/themeSlice'
import { LoginOption } from './LoginOption'
import { LogoutOption } from './LogoutOption'
import { ThemeOption } from './ThemeOption'
import { UserInfo } from './UserInfo'

export const UserMenuContainer = () => {
    const dispatch = useAppDispatch()
    const auth = useAppSelector((state) => state.auth)
    const [anchor, setAnchor] = useState<(EventTarget & Element) | null>(null)
    const userPhoto = auth.user && auth.user.photoURL ? auth.user.photoURL : undefined

    const openMenu = (e: React.MouseEvent) => setAnchor(e.currentTarget)
    const closeMenu = () => setAnchor(null)
    const handleChangeTheme = () => {
        dispatch(toggleTheme())
        closeMenu()
    }

    return (
        <>
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
                {auth.loggedIn ? (
                    [<UserInfo key='userInfo' />, <LogoutOption key='logout' />]
                ) : (
                    <LoginOption />
                )}
                <MenuItem onClick={handleChangeTheme}>
                    <ThemeOption />
                </MenuItem>
            </Menu>
        </>
    )
}
