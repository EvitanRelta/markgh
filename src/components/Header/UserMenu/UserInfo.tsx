import { Box, styled } from '@mui/material'
import { useAppSelector } from '../../../store/hooks'

const StyledUserInfoText = styled(Box)({
    padding: 10,
    fontSize: 15,
    marginLeft: 8,
    marginRight: 5,
    fontWeight: 'bold',
})

export const UserInfo = () => {
    const auth = useAppSelector((state) => state.auth)

    return <StyledUserInfoText>{auth.loggedIn && auth.user?.displayName}</StyledUserInfoText>
}
