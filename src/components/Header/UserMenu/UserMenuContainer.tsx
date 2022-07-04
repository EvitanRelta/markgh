import { Menu, MenuItem } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { toggleTheme } from '../../../store/themeSlice'
import LoginOption from './LoginOption'
import LogoutOption from './LogoutOption'
import ThemeOption from './ThemeOption'
import UserInfo from './UserInfo'

type Props = {
    title: string
}

const UserMenuContainer = ({ title }: Props) => {
    const dispatch = useAppDispatch()
    const auth = useAppSelector((state) => state.auth)

    const [anchor, setAnchor] = useState<(EventTarget & Element) | null>(null)

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

    const userPhoto = auth.user && auth.user.photoURL ? auth.user.photoURL : undefined

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
                    <>
                        <UserInfo />
                        <LogoutOption />
                    </>
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

export default UserMenuContainer
