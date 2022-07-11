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
import { Box, IconButton, styled, SvgIconTypeMap, Tooltip } from '@mui/material'
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
interface BasicFormatOption {
    name: string
    toolbarFunction: ToolbarFunction
    icon: FormatOptionIcon
}
type FormatOption = BasicFormatOption | FormatOptionComponent

const editorOptions: FormatOption[] = [
    { name: 'Bold', toolbarFunction: bold, icon: FormatBoldIcon },
    { name: 'Italic', toolbarFunction: italic, icon: FormatItalicIcon },
    { name: 'Underline', toolbarFunction: underline, icon: FormatUnderlinedIcon },
    { name: 'Strikethrough', toolbarFunction: strikethrough, icon: FormatStrikethroughTwoToneIcon },
    { name: 'Superscript', toolbarFunction: superscript, icon: SuperscriptIcon },
    { name: 'Subscript', toolbarFunction: subscript, icon: SubscriptIcon },
    { name: 'Code', toolbarFunction: code, icon: CodeIcon },
    { name: 'Block Quote', toolbarFunction: blockQuote, icon: FormatQuoteIcon },
    { name: 'Code Block', toolbarFunction: codeBlock, icon: DataObjectIcon },
    { name: 'Link', toolbarFunction: link, icon: LinkIcon },
    HeadingDropDown,
    { name: 'Add Url Image', toolbarFunction: addUrlImage, icon: ImageIcon },
    { name: 'Ordered List', toolbarFunction: orderedList, icon: FormatListNumberedIcon },
    { name: 'Unordered List', toolbarFunction: unorderedList, icon: FormatListBulletedIcon },
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
        if (typeof option !== 'object') {
            const FormatOptionComponent = option
            return <FormatOptionComponent key={index} editor={editor} />
        }

        const { name, toolbarFunction, icon: FormatOptionIcon } = option
        return (
            <Tooltip title={name} key={index} disableInteractive>
                <StyledIconButton onClick={toolbarFunction(editor)}>
                    <FormatOptionIcon />
                </StyledIconButton>
            </Tooltip>
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
