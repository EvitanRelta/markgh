import { GitHub as GitHubIcon } from '@mui/icons-material'
import { ListItemIcon, MenuItem, styled } from '@mui/material'
import { loginUser } from '../../../store/authSlice'
import { useAppDispatch } from '../../../store/hooks'

const StyledMenuItem = styled(MenuItem)({
    padding: 15,
})

export const LoginOption = () => {
    const dispatch = useAppDispatch()

    return (
        <StyledMenuItem onClick={() => dispatch(loginUser())}>
            <ListItemIcon>
                <GitHubIcon />
            </ListItemIcon>
            Login with GitHub
        </StyledMenuItem>
    )
}
