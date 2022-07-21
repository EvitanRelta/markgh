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
type FormatOption = BasicFormatOption | FormatOptionComponent

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

const StyledTooltipText = styled(Box)({
    textAlign: 'center',
})

const EditorToolbar = ({ editor }: Props) => {
    const optionMapping = (option: FormatOption, index: number) => {
        if (typeof option !== 'object') {
            const FormatOptionComponent = option
            return <FormatOptionComponent key={index} editor={editor} />
        }

        const { name, toolbarFunction, icon: FormatOptionIcon, hotkey } = option

        const tooltipTitle = (
            <StyledTooltipText>
                {name} <br /> {hotkey !== undefined && hotkey}
            </StyledTooltipText>
        )

        return (
            <Tooltip title={tooltipTitle} key={index} disableInteractive arrow>
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
