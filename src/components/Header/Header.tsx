import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import { GithubAuthProvider, User } from 'firebase/auth'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import MenuButton from './MenuButton'
import ToolbarContainer from './ToolbarContainer'

interface UserStatus {
    loggedIn: boolean
    info: User | null
}

type Props = {
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    lastEditedOn: string
    onLogin: (provider: GithubAuthProvider) => Promise<string | void>
    onLogout: () => Promise<void>
    user: UserStatus
    ghToken: string | undefined
}

const Header = ({
    title,
    setTitle,
    onUpload,
    lastEditedOn,
    onLogin,
    onLogout,
    user,
    ghToken,
}: Props) => {
    const theme = useSelector((state: RootState) => state.theme)

    //var for current file name
    const [text, setText] = useState(title)

    //vars for theme control
    const themeColor = theme === 'dark' ? '#181414' : 'white'
    const textColor = theme === 'dark' ? 'white' : '#181414'

    return (
        <Box
            style={{
                borderBottom: '1px solid gray',
                marginBottom: '0px',
                padding: '10px',
                paddingBottom: '0px',
                lineHeight: '12px',
            }}
        >
            <Box
                style={{
                    justifyContent: 'space-between',
                    display: 'flex',
                }}
            >
                <Input
                    sx={{
                        '&:before': {
                            borderBottom: '0px',
                            transform: 'scaleX(0)',
                            transition: 'transform 150ms ease-in-out',
                        },
                        '&:hover': {
                            '&&:before': {
                                transform: 'scaleX(1)',
                                borderBottom: '2px solid gray',
                            },
                        },
                    }}
                    type='text'
                    placeholder='Untitled Document'
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value)
                        setTitle(e.target.value)
                    }}
                    style={{
                        border: '0px',
                        fontSize: '25px',
                        width: '30%',
                        backgroundColor: themeColor,
                        color: textColor,
                        marginLeft: 12,
                    }}
                />

                <Box>
                    <MenuButton
                        title={title}
                        onUpload={onUpload}
                        onLogin={onLogin}
                        onLogout={onLogout}
                        user={user}
                    />
                </Box>
            </Box>
            <Box
                style={{
                    display: 'inline-flex',
                    paddingTop: 5,
                    paddingBottom: 5,
                }}
            >
                <ToolbarContainer
                    onUpload={onUpload}
                    title={title}
                    ghToken={ghToken}
                    onLogin={onLogin}
                />
                <Box
                    style={{
                        color: 'gray',
                        paddingLeft: '5px',
                        marginTop: 5.5,
                        textDecoration: 'underline',
                    }}
                >
                    Last edited on {lastEditedOn}
                </Box>
            </Box>
        </Box>
    )
}

export default Header
