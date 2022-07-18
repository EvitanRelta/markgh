import { Box, Button } from '@mui/material'
import { loginUser } from '../../../../store/authSlice'
import { useAppDispatch } from '../../../../store/hooks'

export const PushGHDialogLogin = () => {
    const dispatch = useAppDispatch()

    return (
        <Box sx={{ textAlign: 'center' }}>
            <h4>Please login to continue</h4>
            <Button onClick={() => dispatch(loginUser())}>Login to GitHub</Button>
        </Box>
    )
}
