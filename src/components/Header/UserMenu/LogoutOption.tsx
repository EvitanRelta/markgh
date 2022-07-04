import { Logout as LogoutIcon } from '@mui/icons-material'
import { ListItemIcon, MenuItem } from '@mui/material'
import { logoutUser } from '../../../store/authSlice'
import { useAppDispatch } from '../../../store/hooks'

const Logout = () => {
    const dispatch = useAppDispatch()

    return (
        <MenuItem onClick={() => dispatch(logoutUser())}>
            <ListItemIcon>
                <LogoutIcon />
            </ListItemIcon>
            Logout
        </MenuItem>
    )
}

export default Logout
