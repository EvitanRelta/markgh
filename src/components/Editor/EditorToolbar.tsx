import { FormatStrikethroughTwoTone as FormatStrikethroughTwoToneIcon } from '@mui/icons-material'
import CodeIcon from '@mui/icons-material/Code'
import DataObjectIcon from '@mui/icons-material/DataObject'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import ImageIcon from '@mui/icons-material/Image'
import LinkIcon from '@mui/icons-material/Link'
import { Box, styled, SvgIconTypeMap } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { Editor } from '@tiptap/react'
import React from 'react'
import AlignDropDown from './AlignDropDown'
import HeadingDropDown from './HeadingDropDown'
import {
    addUrlImage,
    blockQuote,
    bold,
    code,
    codeBlock,
    italic,
    link,
    orderedList,
    strikethrough,
    underline,
    unorderedList,
} from './toolbarFunctions'

interface FormatOptionIcon extends OverridableComponent<SvgIconTypeMap<{}, 'svg'>> {
    muiName: string
}
type FormatOptionComponent = (props: { editor: Editor | null }) => JSX.Element
type ToolbarFunction = (editor: Editor | null) => () => void
type FormatOption = [ToolbarFunction, FormatOptionIcon] | FormatOptionComponent

const editorOptions: FormatOption[] = [
    [bold, FormatBoldIcon],
    [italic, FormatItalicIcon],
    [underline, FormatUnderlinedIcon],
    [strikethrough, FormatStrikethroughTwoToneIcon],
    [code, CodeIcon],
    [blockQuote, FormatQuoteIcon],
    [codeBlock, DataObjectIcon],
    [link, LinkIcon],
    HeadingDropDown,
    [addUrlImage, ImageIcon],
    [orderedList, FormatListNumberedIcon],
    [unorderedList, FormatListBulletedIcon],
    AlignDropDown,
]

const StyledIconButton = styled(IconButton)({
    transition: 'none',
    '&:hover': {
        borderRadius: 1,
    },
    marginTop: -1,
})

interface Props {
    editor: Editor | null
}

const EditorToolbar = ({ editor }: Props) => {
    const optionMapping = (option: FormatOption, index: number) => {
        if (!Array.isArray(option)) {
            const FormatOptionComponent = option
            return <FormatOptionComponent key={index} editor={editor} />
        }

        const [toolbarFunction, FormatOptionIcon] = option

        return (
            <StyledIconButton key={index} onClick={toolbarFunction(editor)}>
                <FormatOptionIcon />
            </StyledIconButton>
        )
    }

    return (
        <Box sx={{ borderBottom: '1px solid gray' }}>
            <Box>{editorOptions.map(optionMapping)}</Box>
        </Box>
    )
}

export default React.memo(EditorToolbar)
