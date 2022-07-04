import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { Box, Button, Menu, MenuItem } from '@mui/material'
import { Editor as CoreEditor } from '@tiptap/core'
import { Editor } from '@tiptap/react'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { heading } from './toolbarFunctions'

type HeadingLevels = 0 | 1 | 2 | 3 | 4 | 5 | 6
interface Props {
    editor: Editor | null
}

export const HeadingDropDown = ({ editor }: Props) => {
    const [anchor, setAnchor] = useState<Element | null>(null)
    const [headingLevel, setHeadingLevel] = useState<HeadingLevels | null>(null)
    const theme = useAppSelector((state) => state.theme)

    const openMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        setAnchor(e.currentTarget)
    }

    const closeMenu = () => {
        setAnchor(null)
    }

    useEffect(() => {
        if (!editor) return

        const getHeadingLevel = (editor: CoreEditor) => {
            if (editor.isActive('paragraph')) return 0

            // If multiple different headings types are selected, 'headingAttr.level'
            // will have a value, but 'editor.isActive('heading')' will be false.
            if (!editor.isActive('heading')) return null

            const headingAttr = editor.getAttributes('heading')

            return headingAttr.level === undefined ? null : (headingAttr.level as HeadingLevels)
        }

        editor.on('selectionUpdate', ({ editor }) => {
            setHeadingLevel(getHeadingLevel(editor))
        })
    }, [editor])

    const onChange = (value: HeadingLevels) => {
        heading(editor)(value)
        closeMenu()
    }

    const headingOptions: HeadingLevels[] = [1, 2, 3, 4, 5, 6, 0]

    return (
        <Box style={{ display: 'inline' }}>
            <Button
                onClick={openMenu}
                sx={{
                    textTransform: 'none',
                    color: theme === 'dark' ? 'white' : 'black',
                    borderLeft: '1px solid #d0cccc',
                    borderRight: '1px solid #d0cccc',
                    minWidth: 117.43,
                    maxHeight: 25,
                    paddingRight: 0.5,
                    paddingLeft: 1.5,
                    borderRadius: 0,
                    display: 'flex inline',
                    justifyContent: 'space-between',
                }}
            >
                <Box style={{ display: 'inline' }}>
                    {headingLevel === 0
                        ? 'Normal'
                        : headingLevel === null
                        ? ''
                        : 'Heading ' + headingLevel}
                </Box>
                <ExpandMoreIcon
                    sx={{
                        fontSize: 'medium',
                        padding: 0,
                        position: 'relative',
                        display: 'inline',
                        marginLeft: 2,
                    }}
                />
            </Button>
            <Menu open={Boolean(anchor)} keepMounted anchorEl={anchor} onClose={closeMenu}>
                {headingOptions.map((value, index) => (
                    <MenuItem key={index} onClick={() => onChange(value)}>
                        {value === 0 ? 'Normal' : 'Heading ' + value}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}
