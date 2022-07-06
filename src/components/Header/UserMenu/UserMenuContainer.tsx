import { Avatar, Menu, styled } from '@mui/material'
import { useState } from 'react'
import { useAppSelector } from '../../../store/hooks'
import { LoginOption } from './LoginOption'
import { LogoutOption } from './LogoutOption'
import { ThemeOption } from './ThemeOption'
import { UserInfo } from './UserInfo'

const StyledAvatar = styled(Avatar)({
    width: 35,
    height: 35,
    marginRight: 5,
    marginTop: 5,
    cursor: 'pointer',
    border: '2px solid #1976d2',
})

export const UserMenuContainer = () => {
    const auth = useAppSelector((state) => state.auth)
    const [anchor, setAnchor] = useState<(EventTarget & Element) | null>(null)
    const userPhoto = auth.user && auth.user.photoURL ? auth.user.photoURL : undefined

    const openMenu = (e: React.MouseEvent) => setAnchor(e.currentTarget)
    const closeMenu = () => setAnchor(null)

    return (
        <>
            <StyledAvatar src={userPhoto} onClick={openMenu} />
            <Menu open={Boolean(anchor)} keepMounted anchorEl={anchor} onClose={closeMenu}>
                {auth.loggedIn ? (
                    [<UserInfo key='userInfo' />, <LogoutOption key='logout' />]
                ) : (
                    <LoginOption />
                )}
                <ThemeOption closeMenu={closeMenu} />
            </Menu>
        </>
    )
}
