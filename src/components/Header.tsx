import ContentEditable from 'react-contenteditable'
import { useState } from "react"


const Header: React.FC<{ title: string }> = ({title}) => {


    const [text, setText] = useState(title)

    return <header className = 'title'>
            <input type = 'text' placeholder = 'File Name'
            value = {text} onChange = {(e) => setText(e.target.value)}>
            </input>

            <p>Last edited on </p>

        </header>
}

export default Header