import TextEditor from './components/TextEditor'

export default function App() {
    return (
        <div id='app'>
            <TextEditor />
            <hr />
            <pre id='raw-html' />
            <hr />
            <pre id='cleaned-html' />
            <hr />
            <pre id='markdown' />
        </div>
    )
}