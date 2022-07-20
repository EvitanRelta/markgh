import { FileDownload as FileDownloadIcon } from '@mui/icons-material'
import { Box, MenuItem, styled } from '@mui/material'
import { useAppSelector } from '../../../../store/hooks'

const StyledMenuItem = styled(MenuItem)({
    padding: 10,
    marginTop: 2,
})

const StyledDownloadIcon = styled(FileDownloadIcon)({
    marginLeft: 10,
    marginRight: 10,
})

const StyledText = styled(Box)({
    display: 'inline',
})

export const DownloadMarkdown = () => {
    const fileTitle = useAppSelector((state) => state.data.fileTitle)
    const markdownText = useAppSelector((state) => state.data.markdownText)

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

    const onDownload = () => {
        const fileName = `${fileTitle || 'NewFile'}.md`
        downloadText(markdownText, fileName)
    }

    return (
        <StyledMenuItem onClick={onDownload}>
            <StyledDownloadIcon />
            <StyledText>Download Markdown</StyledText>
        </StyledMenuItem>
    )
}
