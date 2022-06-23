import { Box } from '@mui/material'
import { useAppSelector } from '../../../store/hooks'

const UserInfo = () => {
    const user = useAppSelector((state) => state.user)

    return (
        <Box sx={{ padding: 1, fontSize: 15, marginLeft: 3 }}>
            {user.loggedIn && user.user?.displayName}
        </Box>
    )
}

export default UserInfo
