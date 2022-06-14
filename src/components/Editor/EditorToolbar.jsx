import { FormatStrikethroughTwoTone } from '@mui/icons-material'
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
import IconButton from '@mui/material/IconButton'
import React from 'react'
import AlignDropDown from './AlignDropDown'
import HeadingDropDown from './HeadingDropDown'
import addUrlImage from './toolbarFunctions/addUrlImage'
import blockQuote from './toolbarFunctions/blockQuote'
import bold from './toolbarFunctions/bold'
import code from './toolbarFunctions/code'
import codeBlock from './toolbarFunctions/codeBlock'
import italic from './toolbarFunctions/italic'
import link from './toolbarFunctions/link'
import orderedList from './toolbarFunctions/orderedList'
import strikethrough from './toolbarFunctions/strikethrough'
import underline from './toolbarFunctions/underline'
import unorderedList from './toolbarFunctions/unorderedList'

// interface Props {
//     editor: Editor | null;
// }

const EditorToolbar = ({ editor }) => {
    const EditorOptions = [
        [bold, <FormatBoldIcon />],
        [italic, <FormatItalicIcon />],
        [underline, <FormatUnderlinedIcon />],
        [strikethrough, <FormatStrikethroughTwoTone />],
        [code, <CodeIcon />],
        [blockQuote, <FormatQuoteIcon />],
        [codeBlock, <DataObjectIcon />],
        [link, <LinkIcon />],
        <HeadingDropDown editor={editor} />,
        [addUrlImage, <ImageIcon />],
        [orderedList, <FormatListNumberedIcon />],
        [unorderedList, <FormatListBulletedIcon />],
        <AlignDropDown editor={editor} />,
    ]

    const getObjectIndexFromArray = (object, array) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === object) return i
        }
        return -1
    }

    const optionMapping = (option, index) => {
        return Array.isArray(option) ? (
            <IconButton key={index} onClick={option[0](editor)}>
                {option[1]}
            </IconButton>
        ) : (
            React.cloneElement(option, {
                key: getObjectIndexFromArray(option, EditorOptions),
            })
        )
    }

    return <>{EditorOptions.map(optionMapping)}</>
}

export default EditorToolbar
