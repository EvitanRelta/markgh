import { Box } from '@mui/material'
import { useAppSelector } from '../../../store/hooks'

const UserInfo = () => {
    const auth = useAppSelector((state) => state.auth)

    return (
        <Box sx={{ padding: 1, fontSize: 15, marginLeft: 3 }}>
            {auth.loggedIn && auth.user?.displayName}
        </Box>
    )
}

export default UserInfo
