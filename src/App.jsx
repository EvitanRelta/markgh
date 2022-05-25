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
    const [mdText, setMdText] = useState('')

 

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

    const onUpload = (e) => {
        const allowedFileTypes = ['txt', 'md']
        const file = e.target.files[0]
        console.log(file.name)

        const reader = new FileReader();

        const getFileType = (fileName) => {
            return fileName.split('.').pop().toLowerCase()
        }

        if (!allowedFileTypes.includes(getFileType(file.name)) ) {
            alert('Invalid file type!')
            return
        }

        reader.readAsText(file);
        reader.onload = () => {
            setMdText(reader.result)
    
        }
    
        
    }

  
    

    

    return (
        <ThemeProvider theme = {selectedTheme}>
            <CssBaseline />
            <div id='app'>
                <Header 
                theme = {mode}
                title = {title} 
                setTitle = { setTitle } 
                toggleTheme = { () => setMode(mode === 'light' ? 'dark' : 'light')}
                onUpload = { onUpload }/>
                <Body showMarkdown={ showMarkdown } mdText = {mdText} />
           
             
                
                <div style = {{
                    margin: '20px'
                }}>
                <Footer onClick = { () => setShowMarkdown(!showMarkdown) } showMarkdown = {showMarkdown} />
                </div>
            </div>
        </ThemeProvider>
    )
}