import { CssBaseline } from '@mui/material'
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Dexie, { Table } from 'dexie'
import {
    Auth,
    GithubAuthProvider,
    OAuthCredential,
    onAuthStateChanged,
    signInWithPopup,
} from 'firebase/auth'
import React, { ReactElement, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import Body from './components/Body/Body'
import Footer from './components/Footer/Footer'
import Version from './components/Footer/Version'
import Header from './components/Header/Header'
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from './converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from './converterFunctions/helpers/removeTipTapArtifacts'
import toMarkdown from './converterFunctions/toMarkdown'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { setMdText } from './store/mdTextSlice'
import { setUser } from './store/userSlice'

class EditorDB extends Dexie {
    images!: Table<EditorImage>
    text!: Table<EditorText, number>
    constructor() {
        super('EditorDB')
        this.version(1).stores({
            images: 'id',
            text: 'id',
        })
    }
}

interface EditorImage {
    id?: number
    value: string
}
interface EditorText {
    id?: number
    value: string
}

export default function App(): ReactElement {
    const db = new EditorDB()
    const dispatch = useAppDispatch()

    const editor = useAppSelector((state) => state.editor.editor)

    const saveEditorText = async () => {
        const htmlCopy = editor.view.dom.cloneNode(true) as HTMLElement
        removeCodeBlockWrapper(htmlCopy)
        removeImageWrapper(htmlCopy)
        removeTipTapArtifacts(htmlCopy)

        await db.transaction('rw', db.text, async function () {
            db.text.put({ id: 0, value: htmlCopy.innerHTML })
        })
    }

    useEffect(() => {
        const getPersistedText = async () => {
            const data = await db.text.get(0)
            return data
        }
        getPersistedText().then((data) => {
            if (data === undefined) return
            editor.commands.clearContent(false)
            editor.commands.setContent(data.value, true)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const auth = useAppSelector((state) => state.user.auth)
    const [ghToken, setGhToken] = useState<string | undefined>(localStorage['ghToken'])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => dispatch(setUser(user)))
    }, [auth])

    const loginAuth = (auth: Auth, provider: GithubAuthProvider) => {
        return signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(
                    result
                ) as OAuthCredential
                const token = credential.accessToken as string

                setGhToken(token)
                localStorage['ghToken'] = token

                dispatch(setUser(result.user))
                // ...
                return token
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
                const errorMessage = error.message
                // The email of the user's account used.
                const email = error.customData.email
                // The AuthCredential type that was used.
                const credential = GithubAuthProvider.credentialFromError(error)
                // ...
            })
    }

    //var for controlling whether to show markdown
    const [showMarkdown, setShowMarkdown] = useState(false)

    //var for theme control
    const theme = useAppSelector((state) => state.theme)

    //var for setting file title
    const [title, setTitle] = useState('')

    //var for 'Last edited on'
    const [lastEditedOn, setLastEditedOn] = useState(localStorage['lastEditedOn'])

    //Defining theme colors
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    })

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    })

    //Check selectedTheme
    const selectedTheme = theme === 'dark' ? darkTheme : lightTheme

    //Executes when user uploads a .md or .txt file
    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Allowed file types
        const allowedFileTypes = ['txt', 'md']

        //Retrieving file from event
        const target = e.target as HTMLInputElement
        let file = target.files![0]
        const reader = new FileReader()

        //Check file type
        const getFileType = (fileName: string) => {
            return fileName.split('.').pop()!.toLowerCase()
        }

        //Alert for wrong file type
        if (!allowedFileTypes.includes(getFileType(file.name))) {
            alert('Invalid file type! (.txt or .md only)')
            return
        }

        //Reading file and allocating to state
        reader.readAsText(file)
        reader.onload = () => {
            dispatch(setMdText(reader.result as string))
        }
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

    //Updates preferred theme in localStorage
    useEffect(() => {
        localStorage['selectedTheme'] = theme
    }, [theme])

    return (
        <HelmetProvider>
            <ThemeProvider theme={selectedTheme}>
                <CssBaseline />
                <Helmet>
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
                    <Header
                        title={title}
                        setTitle={setTitle}
                        onUpload={onUpload}
                        lastEditedOn={lastEditedOn}
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
        </HelmetProvider>
    )
}
