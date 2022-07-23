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
    HorizontalRule as HorizontalRuleIcon,
    Image as ImageIcon,
    Link as LinkIcon,
    Subscript as SubscriptIcon,
    Superscript as SuperscriptIcon,
} from '@mui/icons-material'
import { Box, styled, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { Editor } from '@tiptap/react'
import React from 'react'
import { AlignDropDown } from './AlignDropDown'
import { EditorFormatOption } from './EditorFormatOption'
import { HeadingDropDown } from './HeadingDropDown'
import {
    addUrlImage,
    blockQuote,
    bold,
    code,
    codeBlock,
    horizontalRule,
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
    hotkey?: string
}
export type FormatOption = BasicFormatOption | FormatOptionComponent

const editorOptions: FormatOption[] = [
    { name: 'Bold', toolbarFunction: bold, icon: FormatBoldIcon, hotkey: 'Ctrl + B' },
    { name: 'Italic', toolbarFunction: italic, icon: FormatItalicIcon, hotkey: 'Ctrl + I' },
    {
        name: 'Underline',
        toolbarFunction: underline,
        icon: FormatUnderlinedIcon,
        hotkey: 'Ctrl + U',
    },
    {
        name: 'Strikethrough',
        toolbarFunction: strikethrough,
        icon: FormatStrikethroughTwoToneIcon,
        hotkey: 'Ctrl + Shift + X',
    },
    {
        name: 'Superscript',
        toolbarFunction: superscript,
        icon: SuperscriptIcon,
        hotkey: 'Ctrl + .',
    },
    { name: 'Subscript', toolbarFunction: subscript, icon: SubscriptIcon, hotkey: 'Ctrl + ,' },
    { name: 'Code', toolbarFunction: code, icon: CodeIcon, hotkey: 'Ctrl + E' },
    {
        name: 'Block Quote',
        toolbarFunction: blockQuote,
        icon: FormatQuoteIcon,
        hotkey: 'Ctrl + Shift + B',
    },
    {
        name: 'Code Block',
        toolbarFunction: codeBlock,
        icon: DataObjectIcon,
        hotkey: 'Ctrl + Alt + C',
    },
    { name: 'Link', toolbarFunction: link, icon: LinkIcon, hotkey: '' },
    HeadingDropDown,
    { name: 'Add Url Image', toolbarFunction: addUrlImage, icon: ImageIcon },
    {
        name: 'Ordered List',
        toolbarFunction: orderedList,
        icon: FormatListNumberedIcon,
        hotkey: 'Ctrl + Shift + 7',
    },
    {
        name: 'Unordered List',
        toolbarFunction: unorderedList,
        icon: FormatListBulletedIcon,
        hotkey: 'Ctrl + Shift + 8',
    },
    AlignDropDown,
    { name: 'Horizontal Line', toolbarFunction: horizontalRule, icon: HorizontalRuleIcon },
]

const StyledToolbarContainer = styled(Box)({
    borderBottom: '1px solid gray',
    borderTop: '1px solid gray',
    minWidth: '100%',
})

const EditorToolbar = () => {
    return (
        <StyledToolbarContainer>
            {' '}
            {editorOptions.map((option, index) => (
                <EditorFormatOption key={index} option={option} />
            ))}
        </StyledToolbarContainer>
    )
}

const MemorisedEditorToolbar = React.memo(EditorToolbar)

export { MemorisedEditorToolbar as EditorToolbar }
