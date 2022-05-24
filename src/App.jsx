import Body from './components/Body'
import Header from './components/Header'
import Footer from './components/Footer'
import { useState, useRef } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';



export default function App() {

    const [showMarkdown, setShowMarkdown] = useState(false)
    const [mode, setMode] = useState('light');
    const [title, setTitle] = useState('') 

 

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

  
    const selectedTheme = mode === "dark" ? darkTheme : lightTheme;

  
    

    

    return (
        <ThemeProvider theme = {selectedTheme}>
            <CssBaseline />
            <div id='app'>
                <Header 
                theme = {mode}
                title = {title} 
                setTitle = { setTitle } 
                toggleTheme = { () => setMode(mode === 'light' ? 'dark' : 'light')}/>
                <Body showMarkdown={ showMarkdown } title = { title } />
           
             
                
                <div style = {{
                    margin: '20px'
                }}>
                <Footer onClick = { () => setShowMarkdown(!showMarkdown) } showMarkdown = {showMarkdown} />
                </div>
            </div>
        </ThemeProvider>
    )
}