import { Logout as LogoutIcon } from '@mui/icons-material'
import { ListItemIcon, MenuItem, styled } from '@mui/material'
import { logoutUser } from '../../../store/authSlice'
import { useAppDispatch } from '../../../store/hooks'

const StyledMenuItem = styled(MenuItem)({
    padding: 15,
})

export const LogoutOption = () => {
    const dispatch = useAppDispatch()

    return (
        <StyledMenuItem onClick={() => dispatch(logoutUser())}>
            <ListItemIcon>
                <LogoutIcon />
            </ListItemIcon>
            Logout
        </StyledMenuItem>
    )
}
