
import { useState } from "react"
import { FormControlLabel, Switch } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const Header = ({ title, theme, toggleTheme}) => {


    const [text, setText] = useState(title)
    const label = 'Dark mode'
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
                    onChange = {(e) => setText(e.target.value)}
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
                {theme} mode
                <IconButton onClick={toggleTheme} color="inherit">
                    {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon/>}
                </IconButton>
                </div>
            </div>
            
            

            <p style = {{
                color: 'gray',
                paddingLeft: '5px',
            }}>Last edited on </p>

        </header>
}

export default Header