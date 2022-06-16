import { CssBaseline } from '@mui/material'
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Dexie, { Table } from 'dexie'
import { initializeApp } from 'firebase/app'
import {
    Auth,
    getAuth,
    GithubAuthProvider,
    OAuthCredential,
    onAuthStateChanged,
    signInWithPopup,
    User,
} from 'firebase/auth'
import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import firebaseConfig from './components/Authentication/config/firebaseConfig'
import Body from './components/Body/Body'
import Footer from './components/Footer/Footer'
import Version from './components/Footer/Version'
import Header from './components/Header/Header'
import { markdownToHtml } from './converterFunctions'
import toMarkdown from './converterFunctions/toMarkdown'
import { RootState } from './store'
import { setMdText } from './store/mdTextSlice'

interface UserStatus {
    loggedIn: boolean
    info: User | null
}

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

    const dispatch = useDispatch()

    const editor = useSelector((state: RootState) => state.editor.editor)

    const saveEditorText = async () => {
        await db.transaction('rw', db.text, async function () {
            db.text.put({ id: 0, value: editor.view.dom.innerHTML as string })
        })
    }

    useEffect(() => {
        const getPersistedText = async () => {
            const data = await db.text.get(0)
            return data
        }
        getPersistedText().then((data) => {
            if (data === undefined) return
            editor.commands.setContent(markdownToHtml(data.value as string), true)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Initialises firebase for authentication
    const [auth, setAuth] = useState<Auth | null>(null)
    const [user, setUser] = useState<UserStatus>({ loggedIn: false, info: null })
    const [ghToken, setGhToken] = useState<string | undefined>(localStorage['ghToken'])
    useEffect(() => {
        const firebase = initializeApp(firebaseConfig)
        setAuth(getAuth())
    }, [])

    useEffect(() => {
        if (auth === null) return
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({ loggedIn: true, info: auth.currentUser })
            } else {
                setUser({ loggedIn: false, info: null })
            }
        })
    }, [auth])

    const loginAuth = (auth: Auth, provider: GithubAuthProvider) => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(
                    result
                ) as OAuthCredential
                const token = credential.accessToken

                setGhToken(token)
                localStorage['ghToken'] = token
                console.log(token)

                // The signed-in user info.
                const user = result.user
                // ...
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
        return
    }

    //var for controlling whether to show markdown
    const [showMarkdown, setShowMarkdown] = useState(false)

    //var for theme control
    const theme = useSelector((state: RootState) => state.theme)

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

    const onLogin = async (provider: GithubAuthProvider) => {
        if (auth === null) return
        const res = await loginAuth(auth, provider)
    }

    const onLogout = async () => {
        auth?.signOut()
    }

    return (
        <ThemeProvider theme={selectedTheme}>
            <CssBaseline />
            <Box id='app'>
                <Header
                    title={title}
                    setTitle={setTitle}
                    onUpload={onUpload}
                    lastEditedOn={lastEditedOn}
                    onLogin={onLogin}
                    onLogout={onLogout}
                    user={user}
                    ghToken={ghToken}
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
