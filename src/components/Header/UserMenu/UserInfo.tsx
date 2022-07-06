import { Box, styled } from '@mui/material'
import { useAppSelector } from '../../../store/hooks'

const StyledUserInfoContainer = styled(Box)({
    padding: 5,
    fontSize: 15,
    textAlign: 'center',
})

export const UserInfo = () => {
    const auth = useAppSelector((state) => state.auth)

    return (
        <StyledUserInfoContainer>{auth.loggedIn && auth.user?.displayName}</StyledUserInfoContainer>
    )
}
