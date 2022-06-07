import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Dexie from 'dexie'
import Quill from 'quill'
import { ReactElement, useEffect, useState } from 'react'
import Body from './components/Body'
import Footer from './components/Footer'
import Header from './components/Header'
import toMarkdown from './converterFunctions/toMarkdown'

export default function App(): ReactElement {

    //Inititalises db, doesn't execute if db of the same name already exists
    const db = new Dexie("EditorData");
    db.version(1).stores({
        images: "id, base64",
        text: "value"
    })
    
    db.open().catch((err) => {
        console.log(err.stack || err)
    })

    //var for controlling whether to show markdown
    const [showMarkdown, setShowMarkdown] = useState(false)

    //var for theme control
    const [mode, setMode] = useState(localStorage["selectedTheme"] || 'light')
    
    //var for setting file title
    const [title, setTitle] = useState('')

    //var for to contain markdown text
    const [mdText, setMdText] = useState('')


    const [quill, setQuill] = useState<Quill | null>(null)

    //var for 'Last edited on'
    const [lastEditedOn, setLastEditedOn] = useState(localStorage["lastEditedOn"])


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
    const selectedTheme = mode === "dark" ? darkTheme : lightTheme

    //Executes when user uploads a .md or .txt file
    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Allowed file types
        const allowedFileTypes = ['txt', 'md']

        //Retrieving file from event
        const target = e.target as HTMLInputElement
        let file = (target.files![0])
        const reader = new FileReader()

        //Check file type
        const getFileType = (fileName: string) => {
            return (fileName.split('.').pop()!.toLowerCase())
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

    //Toggle theme
    const toggleTheme = () => {
        setMode(mode === 'light' ? 'dark' : 'light')
    }
     
    
    const getMarkdownText = () => toMarkdown(document.getElementsByClassName('ql-editor')[0] as HTMLElement)

    //Updates preferred theme in localStorage
    useEffect(() => {
        localStorage["selectedTheme"] = mode
    }, [mode])
    
    
    //Updates markdown text when prompted to show it
    useEffect(() => {
        if (!showMarkdown) return
        if (document.getElementsByClassName('ql-editor')[0] === undefined) return

        setMdText(getMarkdownText())
    }, [showMarkdown])

    //Updates markdown text when text is changed in quill
    useEffect(() => {
        if (quill === null) return

        quill.on('text-change', () => {
            setMdText(getMarkdownText())
        })  
    }, [quill])

    //Updates 'Last Edited On' in local storage when text is changed in quill
    useEffect(() => {

        //Formatting time as text
        const date = new Date()
        const n = date.toDateString() 
        var t = date.toLocaleTimeString()
        var timeShort = (t.length == 11 ? t.substring(0, 5) : t.substring(0, 4)) + " " + t.substring(t.length-2, t.length)
        var dateShort = n.substring(4, n.length - 5)
        var dateTime = dateShort + " " + timeShort

        //Updates 'Last Edited On' in localStorage and state when text in quill is changed
        if (quill == null) return
        quill.on('text-change', () => {
            setLastEditedOn(dateTime)
            localStorage["lastEditedOn"] = dateTime
        })

    }, [quill])

    
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
                    lastEditedOn= {lastEditedOn}
                />
                <Body showMarkdown={showMarkdown} mdText={mdText} setQuill={setQuill} />
                <div>
                    <Footer onClick={() => setShowMarkdown(!showMarkdown)} showMarkdown={showMarkdown} theme={mode} db = {db}/>
                </div>
            </div>
        </ThemeProvider>
    )
}