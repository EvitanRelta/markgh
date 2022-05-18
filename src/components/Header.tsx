
import { useState } from "react"
import { Switch } from '@mui/material'


const Header: React.FC<{ title: string }> = ({title}) => {


    const [text, setText] = useState(title)
    const label = 'Dark mode'

    return <header className = 'title'>
            <div>
                <input type = 'text' placeholder = 'File Name'
                value = {text} onChange = {(e) => setText(e.target.value)}>
                </input>
                <Switch {...label} disabled defaultChecked />
            </div>

            <p>Last edited on </p>

        </header>
}

export default Header