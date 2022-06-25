import Box from '@mui/material/Box'
import { useAppSelector } from '../../../store/hooks'
import FileOption from './FileMenu/FileOption'
import SnapshotOption from './Snapshots/SnapshotOption'

const ToolbarContainer = ({ title, db }) => {
    const mdText = useAppSelector((state) => state.mdText)

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
        <Box>
            <FileOption onDownload={onDownload} />
            <SnapshotOption db={db} />
        </Box>
    )
}

export default ToolbarContainer
