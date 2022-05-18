import TextEditor from './components/TextEditor'
import Header from './components/Header'
import Footer from './components/Footer'
import { useState } from 'react'

export default function App() {

    const [showMarkdown, setShowMarkdown] = useState(false)
    
    const [title, setTitle] = useState('')




    return (
        <div id='app'>
            <Header title = {title} onChangeTitle = {(newTitle) => setTitle(newTitle)} />
            <TextEditor />
            <Footer onClick = { () => setShowMarkdown(!showMarkdown) } showMarkdown = {showMarkdown}/>
        </div>
    )
}