import { Box, CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Body } from './components/Body/Body'
import { Footer } from './components/Footer/Footer'
import { Version } from './components/Footer/Version'
import { Header } from './components/Header/Header'
import { setUser } from './store/authSlice'
import { setEditorContent } from './store/dataSlice'
import { useAppDispatch, useAppSelector } from './store/hooks'

export const App = () => {
    const dispatch = useAppDispatch()
    const db = useAppSelector((state) => state.data.database)
    const auth = useAppSelector((state) => state.auth.auth)
    const theme = useAppSelector((state) => state.theme)

    //var for controlling whether to show markdown
    const [showMarkdown, setShowMarkdown] = useState(false)

    //var for setting file title
    const [fileTitle, setFileTitle] = useState('')

    //Defining theme colors
    const darkTheme = createTheme({
        palette: { mode: 'dark' },
    })
    const lightTheme = createTheme({
        palette: { mode: 'light' },
    })
    const selectedTheme = theme === 'dark' ? darkTheme : lightTheme

    useEffect(() => {
        const getPersistentContent = async () => {
            const data = await db.text.get(0)
            return data
        }
        getPersistentContent().then((data) => {
            if (data === undefined) return
            dispatch(setEditorContent(data.value))
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => dispatch(setUser(user)))
    }, [auth])

    //Updates preferred theme in localStorage
    useEffect(() => {
        localStorage['theme'] = theme
    }, [theme])

    return (
        <ThemeProvider theme={selectedTheme}>
            <CssBaseline />
            <Box id='app'>
                <Header fileTitle={fileTitle} setFileTitle={setFileTitle} />
                <Body showMarkdown={showMarkdown} />
                <Box>
                    <Footer
                        onClick={() => setShowMarkdown(!showMarkdown)}
                        showMarkdown={showMarkdown}
                    />
                </Box>
                <Version />
            </Box>
        </ThemeProvider>
    )
}
