import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Dexie from 'dexie'
import { initializeApp } from 'firebase/app'
import { Auth, getAuth, GithubAuthProvider, onAuthStateChanged, User } from 'firebase/auth'
import { ReactElement, useEffect, useState } from 'react'
import firebaseConfig from './components/Authentication/config/firebaseConfig'
import loginAuth from './components/Authentication/service/loginAuth'
import Body from './components/Body/Body'
import Footer from './components/Footer/Footer'
import Version from './components/Footer/Version'
import Header from './components/Header/Header'
import toMarkdown from './converterFunctions/toMarkdown'

interface UserStatus {
    loggedIn: boolean
    info: User | null
}

export default function App(): ReactElement {
    //Initialises firebase for authentication
    const [auth, setAuth] = useState<Auth | null>(null)
    const [user, setUser] = useState<UserStatus>({ loggedIn: false, info: null })
    useEffect(() => {
        const firebase = initializeApp(firebaseConfig)
        setAuth(getAuth())
    }, [])

    useEffect(() => {
        if (auth === null) return
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(auth.currentUser)

                setUser({ loggedIn: true, info: auth.currentUser })
            } else {
                console.log(user)
                setUser({ loggedIn: false, info: null })
            }
        })
    }, [auth])

    //Inititalises db, doesn't execute if db of the same name already exists
    const db = new Dexie('EditorData')
    db.version(1).stores({
        images: 'id, base64',
        text: 'value',
    })

    db.open().catch((err) => {
        console.log(err.stack || err)
    })

    //var for controlling whether to show markdown
    const [showMarkdown, setShowMarkdown] = useState(false)

    //var for theme control
    const [mode, setMode] = useState<'light' | 'dark'>(localStorage['selectedTheme'] || 'light')

    //var for setting file title
    const [title, setTitle] = useState('')

    //var for to contain markdown text
    const [mdText, setMdText] = useState('')

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
    const selectedTheme = mode === 'dark' ? darkTheme : lightTheme

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
            setMdText(reader.result as string)
        }
    }

    const onTextChange = (editorContainer: HTMLElement) => {
        const markdown = toMarkdown(editorContainer)
        setMdText(markdown)

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

    //Toggle theme
    const toggleTheme = () => {
        setMode(mode === 'light' ? 'dark' : 'light')
    }

    //Updates preferred theme in localStorage
    useEffect(() => {
        localStorage['selectedTheme'] = mode
    }, [mode])

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
            <div id='app'>
                <Header
                    theme={mode}
                    title={title}
                    setTitle={setTitle}
                    toggleTheme={toggleTheme}
                    onUpload={onUpload}
                    lastEditedOn={lastEditedOn}
                    mdText={mdText}
                    setMdText={setMdText}
                    onLogin={onLogin}
                    onLogout={onLogout}
                    user={user}
                />
                <Body
                    showMarkdown={showMarkdown}
                    mdText={mdText}
                    theme={mode}
                    onTextChange={onTextChange}
                />
                <div>
                    <Footer
                        onClick={() => setShowMarkdown(!showMarkdown)}
                        showMarkdown={showMarkdown}
                        theme={mode}
                        db={db}
                    />
                </div>
                <Version />
            </div>
        </ThemeProvider>
    )
}
