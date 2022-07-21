import { Box, Button, styled } from '@mui/material'
import { loginUser } from '../../../../store/authSlice'
import { useAppDispatch } from '../../../../store/hooks'

const StyledLoginContainer = styled(Box)({
    textAlign: 'center',
    border: '1px solid gray',
    borderRadius: 10,
    maxWidth: 300,
    minHeight: 130,
    marginTop: 20,
    marginLeft: '23.5%',
})

export const PushGHDialogLogin = () => {
    const dispatch = useAppDispatch()

    return (
        <StyledLoginContainer>
            <h4>Please login to continue</h4>
            <Button variant='outlined' onClick={() => dispatch(loginUser())}>
                Login to GitHub
            </Button>
        </StyledLoginContainer>
    )
}
