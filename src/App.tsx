import TextEditor from './components/TextEditor'
import Header from './components/Header'

export default function App() {
    return (
        <div id='app'>
            <Header title = "File Name"/>
            <TextEditor />
        </div>
    )
}