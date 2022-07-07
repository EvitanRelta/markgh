import {
    Code as CodeIcon,
    DataObject as DataObjectIcon,
    FormatBold as FormatBoldIcon,
    FormatItalic as FormatItalicIcon,
    FormatListBulleted as FormatListBulletedIcon,
    FormatListNumbered as FormatListNumberedIcon,
    FormatQuote as FormatQuoteIcon,
    FormatStrikethroughTwoTone as FormatStrikethroughTwoToneIcon,
    FormatUnderlined as FormatUnderlinedIcon,
    Image as ImageIcon,
    Link as LinkIcon,
    Subscript as SubscriptIcon,
    Superscript as SuperscriptIcon,
} from '@mui/icons-material'
import { Box, IconButton, styled, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { Editor } from '@tiptap/react'
import React from 'react'
import { AlignDropDown } from './AlignDropDown'
import { HeadingDropDown } from './HeadingDropDown'
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
    subscript,
    superscript,
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
    [superscript, SuperscriptIcon],
    [subscript, SubscriptIcon],
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

interface Props {
    editor: Editor | null
}

const StyledIconButton = styled(IconButton)({
    transition: 'none',
    '&:hover': {
        borderRadius: 1,
    },
    marginTop: -1,
})
const StyledToolbarContainer = styled(Box)({
    borderBottom: '1px solid gray',
})

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
        <StyledToolbarContainer>
            <Box>{editorOptions.map(optionMapping)}</Box>
        </StyledToolbarContainer>
    )
}

const MemorisedEditorToolbar = React.memo(EditorToolbar)

export { MemorisedEditorToolbar as EditorToolbar }
