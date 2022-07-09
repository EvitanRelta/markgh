import { Box } from '@mui/material'
import { useAppSelector } from '../../../store/hooks'
import { FileOption } from './FileMenu/FileOption'
import { SnapshotOption } from './Snapshots/SnapshotOption'

interface Props {
    openVersions: (e: React.MouseEvent) => void
}

export const ToolbarContainer = ({ openVersions }: Props) => {
    const fileTitle = useAppSelector((state) => state.data.fileTitle)
    const markdownText = useAppSelector((state) => state.data.markdownText)

    const onDownload = () => {
        const fileName = `${fileTitle || 'NewFile'}.md`
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
