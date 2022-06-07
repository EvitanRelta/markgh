import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Quill from 'quill'
import { ReactElement, useEffect, useState } from 'react'
import Body from './components/Body'
import Footer from './components/Footer'
import Header from './components/Header'
import toMarkdown from './converterFunctions/toMarkdown'

export default function App(): ReactElement {
    const [showMarkdown, setShowMarkdown] = useState(false)
    const [mode, setMode] = useState('light')
    const [title, setTitle] = useState('')
    const [mdText, setMdText] = useState('')
    const [quill, setQuill] = useState<Quill | null>(null)

    //var for 'Last edited on'
    const [lastEditedOn, setLastEditedOn] = useState(localStorage["lastEditedOn"])

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

    const selectedTheme = mode === "dark" ? darkTheme : lightTheme

    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const allowedFileTypes = ['txt', 'md']
        const target = e.target as HTMLInputElement

        let file = (target.files![0])

        const reader = new FileReader()

        const getFileType = (fileName: string) => {
            return (fileName.split('.').pop()!.toLowerCase())
        }

        if (!allowedFileTypes.includes(getFileType(file.name))) {
            alert('Invalid file type! (.txt or .md only)')
            return
        }

        reader.readAsText(file)
        reader.onload = () => {
            setMdText(reader.result as string)
        }
    }

    const getMarkdownText = () => toMarkdown(document.getElementsByClassName('ql-editor')[0] as HTMLElement)

    useEffect(() => {
        if (!showMarkdown) return
        if (document.getElementsByClassName('ql-editor')[0] === undefined) return

        setMdText(getMarkdownText())
    }, [showMarkdown])

    useEffect(() => {
        if (quill === null) return

        quill.on('text-change', () => {
            setMdText(getMarkdownText())
        })  
    }, [quill])

    useEffect(() => {
        const date = new Date()
        const n = date.toDateString() 
        var t = date.toLocaleTimeString()
        var timeShort = (t.length == 11 ? t.substring(0, 5) : t.substring(0, 4)) + " " + t.substring(t.length-2, t.length)
        var dateShort = n.substring(4, n.length - 5)
        var dateTime = dateShort + " " + timeShort

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
                    toggleTheme={() => setMode(mode === 'light' ? 'dark' : 'light')}
                    onUpload={onUpload}
                    lastEditedOn= {lastEditedOn}
                />
                <Body showMarkdown={showMarkdown} mdText={mdText} setQuill={setQuill} />
                <div>
                    <Footer onClick={() => setShowMarkdown(!showMarkdown)} showMarkdown={showMarkdown} theme={mode}/>
                </div>
            </div>
        </ThemeProvider>
    )
}