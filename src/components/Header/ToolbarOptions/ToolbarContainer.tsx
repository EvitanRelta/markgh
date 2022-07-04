import Box from '@mui/material/Box'
import { useAppSelector } from '../../../store/hooks'
import { EditorDB } from '../../IndexedDB/initDB'
import FileOption from './FileMenu/FileOption'
import SnapshotOption from './Snapshots/SnapshotOption'
type Props = {
    title: string
    db: EditorDB
    openVersions: (e: React.MouseEvent) => void
}

const ToolbarContainer = ({ title, db, openVersions }: Props) => {
    const markdownText = useAppSelector((state) => state.mdText)

    const onDownload = () => {
        const fileName = `${title || 'NewFile'}.md`
        downloadText(markdownText, fileName)
    }

    const downloadText = (text: string, fileName: string) => {
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
            <SnapshotOption openVersions={openVersions} />
        </Box>
    )
}

export default ToolbarContainer
