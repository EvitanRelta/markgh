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
}
export type FormatOption = BasicFormatOption | FormatOptionComponent

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
    { name: 'Horizontal Line', toolbarFunction: horizontalRule, icon: HorizontalRuleIcon },
]

interface Props {
    editor: Editor | null
}

const StyledToolbarContainer = styled(Box)({
    borderBottom: '1px solid gray',
    borderTop: '1px solid gray',
    minWidth: '100%',
})

const EditorToolbar = ({ editor }: Props) => {
    return (
        <StyledToolbarContainer>
            {' '}
            {editorOptions.map((option) => (
                <EditorFormatOption option={option} />
            ))}
        </StyledToolbarContainer>
    )
}

const MemorisedEditorToolbar = React.memo(EditorToolbar)

export { MemorisedEditorToolbar as EditorToolbar }
