import { FolderOpen as FolderOpenIcon } from '@mui/icons-material'
import { Box, IconButton, Input, MenuItem } from '@mui/material'
import React from 'react'
import { markdownToHtml } from '../../../../converterFunctions'
import { useAppSelector } from '../../../../store/hooks'

export const OpenFile = () => {
    const editor = useAppSelector((state) => state.editor.editor)

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
            editor.commands.setContent(markdownToHtml(reader.result as string), true, {
                preserveWhitespace: 'full',
            })
        }
    }

    return (
        <MenuItem style={{ padding: 0 }}>
            <label style={{ cursor: 'pointer', minWidth: 250 }}>
                <Box style={{ display: 'none' }}>
                    <Input type='file' onChange={handleUpload} />
                </Box>
                <Box
                    style={{
                        display: 'inline-block',
                        marginRight: 6,
                        paddingLeft: 11,
                    }}
                >
                    <IconButton component='span'>
                        <FolderOpenIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'inline' }}>Open...</Box>
            </label>
        </MenuItem>
    )
}
