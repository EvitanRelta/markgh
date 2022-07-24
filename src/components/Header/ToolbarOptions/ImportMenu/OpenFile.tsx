import { FolderOpen } from '@mui/icons-material'
import { Box, Input, MenuItem, styled } from '@mui/material'
import React from 'react'
import { importMarkdown } from '../../../../store/dataSlice'
import { useAppDispatch } from '../../../../store/hooks'

const StyledMenuItem = styled(MenuItem)({
    padding: 10,
    marginTop: 2,
    marginBottom: 2,
})

const StyledLabel = styled('label')({
    cursor: 'pointer',
    minWidth: '100%',
})
const StyledFileInput = styled(Input)({
    display: 'none',
})

const StyledFolderOpenIcon = styled(FolderOpen)({
    marginLeft: 10,
    marginRight: 10,
})

const StyledText = styled(Box)({
    marginTop: -30,
    marginLeft: 42,
})

export const OpenFile = () => {
    const dispatch = useAppDispatch()

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const allowedFileTypes = ['txt', 'md']

        const file = e.target.files![0]
        const reader = new FileReader()

        const getFileType = (fileName: string) =>
            /(?<=\.)[^.]+$/.exec(fileName)?.[0].toLowerCase() ?? null
        const isValidFileType = (fileName: string) => {
            const fileType = getFileType(fileName)
            return fileType && allowedFileTypes.includes(fileType)
        }

        if (!isValidFileType(file.name)) return alert('Invalid file type! (.txt or .md only)')

        reader.readAsText(file)
        reader.onload = () => {
            dispatch(
                importMarkdown({
                    fileTitle: file.name,
                    markdown: reader.result as string,
                })
            )
        }
    }

    return (
        <StyledMenuItem>
            <StyledLabel>
                <StyledFileInput type='file' onChange={handleUpload} />
                <Box style={{ display: 'inline' }}>
                    <StyledFolderOpenIcon />
                </Box>
                <StyledText>Open from device...</StyledText>
            </StyledLabel>
        </StyledMenuItem>
    )
}
