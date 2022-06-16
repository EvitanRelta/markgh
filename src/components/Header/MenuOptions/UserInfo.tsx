import { Box } from '@mui/material'
import { User } from 'firebase/auth'

interface UserStatus {
    loggedIn: boolean
    info: User | null
}

type Props = {
    user: UserStatus
}

const UserInfo = ({ user }: Props) => {
    return (
        <Box sx={{ padding: 1, fontSize: 15, marginLeft: 3 }}>
            {user.loggedIn && user.info?.displayName}
        </Box>
    )
}

export default UserInfo
