
import { useState } from "react"
import MenuButton from './MenuButton'

const Header = ({ title, theme, toggleTheme, setTitle, onUpload}) => {

   

    //var for current file name
    const [text, setText] = useState(title)



    //var for uploading file
    const [fileName, setFileName] = useState('No File Chosen')

            //vars for theme control
            const themeColor = theme === 'dark' ? '#181414' : 'white';
            const textColor = theme === 'dark' ? 'white' : '#181414'
        


   
    

    return <header style = {{
                borderBottom: '1px solid gray',
                marginBottom: '15px',
                padding: '10px',
                paddingBottom: '0px',
                lineHeight: '12px',

            }}>
            <div style = {{
                justifyContent: 'space-between',
                display: 'flex'
               }}>
                <input
                    type = 'text'
                    placeholder = 'File Name'
                    value = {text}
                    onChange = {(e) => {
                        setText(e.target.value)
                        setTitle(e.target.value)  
                    }}
                    style = {{ 
                        border: '0px',
                        fontSize: '25px',
                        width: '30%',
                        backgroundColor : themeColor,
                        color: textColor
                     }}
                >
                </input>
                <div>
                  <MenuButton theme = {theme} toggleTheme = {toggleTheme} title = {title} onUpload = {onUpload}/>

                {/* {theme} mode
                <IconButton onClick={toggleTheme} color="inherit">
                    {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon/>}
                </IconButton> */}
                </div>
            </div>
            
            

            <p style = {{
                color: 'gray',
                paddingLeft: '5px',
            }}> Last edited on
            </p>

           

        </header>
}

export default Header