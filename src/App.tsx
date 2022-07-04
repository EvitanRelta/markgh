import { CssBaseline } from '@mui/material'
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { onAuthStateChanged } from 'firebase/auth'
import { ReactElement, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import Body from './components/Body/Body'
import Footer from './components/Footer/Footer'
import Version from './components/Footer/Version'
import { Header } from './components/Header/Header'
import { EditorDB } from './components/IndexedDB/initDB'
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from './converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from './converterFunctions/helpers/removeTipTapArtifacts'
import toMarkdown from './converterFunctions/toMarkdown'
import { setUser } from './store/authSlice'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { setMdText } from './store/mdTextSlice'

export default function App(): ReactElement {
    const db = new EditorDB()
    const dispatch = useAppDispatch()
    const editor = useAppSelector((state) => state.editor.editor)
    const auth = useAppSelector((state) => state.auth.auth)
    const theme = useAppSelector((state) => state.theme)

    //var for controlling whether to show markdown
    const [showMarkdown, setShowMarkdown] = useState(false)

    //var for setting file title
    const [title, setTitle] = useState('')

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
        const getPersistedText = async () => {
            const data = await db.text.get(0)
            return data
        }
        getPersistedText().then((data) => {
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
        localStorage['selectedTheme'] = theme
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
        dispatch(setMdText(markdown))

        //Updates 'Last Edited On' in local storage when text is changed in editor
        //Formatting time as text
        const date = new Date()
        const n = date.toDateString()
        var t = date.toLocaleTimeString()
        var timeShort =
            (t.length == 11 ? t.substring(0, 5) : t.substring(0, 4)) +
            ' ' +
            t.substring(t.length - 2, t.length)
        var dateShort = n.substring(4, n.length - 5)
        var dateTime = dateShort + ' ' + timeShort

        setLastEditedOn(dateTime)
        localStorage['lastEditedOn'] = dateTime
    }

    return (
        <HelmetProvider>
            <ThemeProvider theme={selectedTheme}>
                <CssBaseline />
                <Helmet>
                    <title>MarkGH</title>
                    {/* Verification to be indexed in Google Search */}
                    <meta
                        name='google-site-verification'
                        content='k_CidVKA4Ha_6LYDQrDAZTR7StqP1zaM93hHP6FSB-Q' //this will change for when we actually deploy it.
                        //go to https://search.google.com/search-console/welcome to get a verification key
                    />
                    {/* Keywords for Google search terms */}
                    <meta name='keywords' content='Markdown, Editor, Edit, HTML, Convert, Github' />

                    {/* Brief description of website when it appears in Google search */}
                    <meta
                        name='description'
                        content='Write in Rich Text and export it as Markdown for GitHub!'
                    />
                </Helmet>
                <Box id='app'>
                    <Header title={title} setTitle={setTitle} lastEditedOn={lastEditedOn} db={db} />
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
        </HelmetProvider>
    )
}
