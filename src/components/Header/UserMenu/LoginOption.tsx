import { GitHub as GitHubIcon } from '@mui/icons-material'
import { ListItemIcon, MenuItem } from '@mui/material'
import { loginUser } from '../../../store/authSlice'
import { useAppDispatch } from '../../../store/hooks'

const LoginOption = () => {
    const dispatch = useAppDispatch()

    return (
        <MenuItem onClick={() => dispatch(loginUser())}>
            <ListItemIcon>
                <GitHubIcon />
            </ListItemIcon>
            Login with GitHub
        </MenuItem>
    )
}

export default LoginOption
