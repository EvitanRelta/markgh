import { Box, CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Body } from './components/Body/Body'
import { Footer } from './components/Footer/Footer'
import { Version } from './components/Footer/Version'
import { Header } from './components/Header/Header'
import { LoadingAnimation } from './components/LoadingAnimation'
import { useAppSelector } from './store/hooks'

export const App = () => {
    const theme = useAppSelector((state) => state.theme)

    //Defining theme colors
    const darkTheme = createTheme({
        palette: { mode: 'dark' },
    })
    const lightTheme = createTheme({
        palette: { mode: 'light' },
    })
    const selectedTheme = theme === 'dark' ? darkTheme : lightTheme

    return (
        <ThemeProvider theme={selectedTheme}>
            <CssBaseline />
            <Box id='app'>
                <Header />
                <Body />
                <Box>
                    <Footer />
                </Box>
                <Version />
                <LoadingAnimation />
            </Box>
        </ThemeProvider>
    )
}
