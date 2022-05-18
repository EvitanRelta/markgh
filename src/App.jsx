import TextEditor from './components/TextEditor'
import Header from './components/Header'
import Footer from './components/Footer'
import { useState, useRef } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import MarkdownText from './components/MarkdownText'


export default function App() {

    const [showMarkdown, setShowMarkdown] = useState(false)
 

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

    const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
    });

    const [mode, setMode] = useState('light');
    const [title, setTitle] = useState('')
    const selectedTheme = mode === "dark" ? darkTheme : lightTheme;

    const editorWidth = showMarkdown ? '50%' : '100%'

    

    return (
        <ThemeProvider theme = {selectedTheme}>
            <CssBaseline />
            <div id='app'>
                <Header 
                theme = {mode}
                title = {title} 
                onChangeTitle = { (newTitle) => setTitle(newTitle) } 
                toggleTheme = { () => setMode(mode === 'light' ? 'dark' : 'light')}/>
                <div style = {{
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    display: 'flex'
                }}>
                <div style = {{
                margin: '10px',
                width: editorWidth,
                height: 'stretch'
                }}>
                <TextEditor />
                </div>
                {showMarkdown &&
                <MarkdownText  markdown = 'test'/>}
                </div >
                <div style = {{
                    margin: '20px'
                }}>
                <Footer onClick = { () => setShowMarkdown(!showMarkdown) } showMarkdown = {showMarkdown} />
                </div>
            </div>
        </ThemeProvider>
    )
}