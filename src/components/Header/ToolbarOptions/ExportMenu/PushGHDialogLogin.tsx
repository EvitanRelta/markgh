import { Box, Button, styled } from '@mui/material'
import { loginUser } from '../../../../store/authSlice'
import { useAppDispatch } from '../../../../store/hooks'

const StyledLoginContainer = styled(Box)({
    textAlign: 'center',
})

export const PushGHDialogLogin = () => {
    const dispatch = useAppDispatch()

    return (
        <StyledLoginContainer>
            <h4>Please login to continue</h4>
            <Button onClick={() => dispatch(loginUser())}>Login to GitHub</Button>
        </StyledLoginContainer>
    )
}
