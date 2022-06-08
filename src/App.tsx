import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ReactElement, useState } from 'react'
import Body from './components/Body'
import Footer from './components/Footer'
import Header from './components/Header'
import Version from './components/Version'
import toMarkdown from './converterFunctions/toMarkdown'

export default function App(): ReactElement {
    const [showMarkdown, setShowMarkdown] = useState(false)
    const [mode, setMode] = useState<'light' | 'dark'>('light')
    const [title, setTitle] = useState('')
    const [mdText, setMdText] = useState('')

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

    const selectedTheme = mode === 'dark' ? darkTheme : lightTheme

    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const allowedFileTypes = ['txt', 'md']
        const target = e.target as HTMLInputElement

        let file = target.files![0]

        const reader = new FileReader()

        const getFileType = (fileName: string) => {
            return fileName.split('.').pop()!.toLowerCase()
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

    const onTextChange = (editorContainer: HTMLElement) => {
        const markdown = toMarkdown(editorContainer)
        setMdText(markdown)
    }

    return (
        <ThemeProvider theme={selectedTheme}>
            <CssBaseline />
            <div id='app'>
                <Header
                    theme={mode}
                    title={title}
                    setTitle={setTitle}
                    toggleTheme={() =>
                        setMode(mode === 'light' ? 'dark' : 'light')
                    }
                    onUpload={onUpload}
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
                    />
                </div>
                <Version />
            </div>
        </ThemeProvider>
    )
}
