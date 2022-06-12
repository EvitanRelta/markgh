import FileOption from './ToolbarOptions/FileMenu/FileOption'

const ToolbarContainer = ({ onUpload, mdText, title }) => {
    const onDownload = () => {
        const fileName = `${title || 'NewFile'}.md`
        //const markdownText = toMarkdown(mdText)
        downloadText(mdText, fileName)
    }

    const downloadText = (text, fileName) => {
        const element = document.createElement('a')
        const file = new Blob([text], { type: 'text/plain;charset=utf-8' })
        element.href = URL.createObjectURL(file)
        element.download = fileName
        element.hidden = true
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    return (
        <div>
            <FileOption onUpload={onUpload} onDownload={onDownload} />
        </div>
    )
}

export default ToolbarContainer
