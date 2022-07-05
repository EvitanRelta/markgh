import { Box, CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Body } from './components/Body/Body'
import { Footer } from './components/Footer/Footer'
import { Version } from './components/Footer/Version'
import { Header } from './components/Header/Header'
import { EditorDB } from './components/IndexedDB/initDB'
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from './converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from './converterFunctions/helpers/removeTipTapArtifacts'
import { toMarkdown } from './converterFunctions/toMarkdown'
import { setUser } from './store/authSlice'
import { formatDateTime } from './store/helpers/formatDateTime'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { setMarkdownText } from './store/markdownTextSlice'

export const App = () => {
    const db = new EditorDB()
    const dispatch = useAppDispatch()
    const editor = useAppSelector((state) => state.editor.editor)
    const auth = useAppSelector((state) => state.auth.auth)
    const theme = useAppSelector((state) => state.theme)

    //var for controlling whether to show markdown
    const [showMarkdown, setShowMarkdown] = useState(false)

    //var for setting file title
    const [fileTitle, setFileTitle] = useState('')

    //var for 'Last edited on'
    const [lastEditedOn, setLastEditedOn] = useState(localStorage['lastEditedOn'])

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
            editor.commands.clearContent(false)
            editor.commands.setContent(data.value, true, { preserveWhitespace: 'full' })
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

    const saveEditorText = async () => {
        const htmlCopy = editor.view.dom.cloneNode(true) as HTMLElement
        removeCodeBlockWrapper(htmlCopy)
        removeImageWrapper(htmlCopy)
        removeTipTapArtifacts(htmlCopy)

        await db.transaction('rw', db.text, async function () {
            db.text.put({ id: 0, value: htmlCopy.innerHTML })
        })
    }

    const onTextChange = (editorContainer: Element) => {
        const markdown = toMarkdown(editorContainer)
        saveEditorText()
        dispatch(setMarkdownText(markdown))

        const now = new Date()
        const formatedNow = formatDateTime(now)

        setLastEditedOn(formatedNow)
        localStorage['lastEditedOn'] = formatedNow
    }

    return (
        <ThemeProvider theme={selectedTheme}>
            <CssBaseline />
            <Box id='app'>
                <Header
                    fileTitle={fileTitle}
                    setFileTitle={setFileTitle}
                    lastEditedOn={lastEditedOn}
                    db={db}
                />
                <Body showMarkdown={showMarkdown} onTextChange={onTextChange} />
                <Box>
                    <Footer
                        onClick={() => setShowMarkdown(!showMarkdown)}
                        showMarkdown={showMarkdown}
                        db={db}
                    />
                </Box>
                <Version />
            </Box>
        </ThemeProvider>
    )
}
