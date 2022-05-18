import TextEditor from './components/TextEditor'
import Header from './components/Header'
import Footer from './components/Footer'
import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import React from 'react'

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



    return (
        <ThemeProvider theme = {selectedTheme}>
            <CssBaseline />
            <div id='app'>
                <Header title = {title} onChangeTitle = {(newTitle) => setTitle(newTitle)} />
                <TextEditor />
                <Footer onClick = { () => setShowMarkdown(!showMarkdown) } showMarkdown = {showMarkdown}/>
            </div>
        </ThemeProvider>
    )
}