import { FormatStrikethroughTwoTone } from '@mui/icons-material'
import CodeIcon from '@mui/icons-material/Code'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import IconButton from '@mui/material/IconButton'
import { Editor } from '@tiptap/react'
import AlignDropDown from './AlignDropDown'
import HeadingDropDown from './HeadingDropDown'
import addUrlImage from './toolbarFunctions/addUrlImage'
import blockQuote from './toolbarFunctions/blockQuote'
import codeBlock from './toolbarFunctions/codeBlock'
import link from './toolbarFunctions/link'
import orderedList from './toolbarFunctions/orderedList'
import unorderedList from './toolbarFunctions/unorderedList'

interface Props {
    editor: Editor | null
}

const EditorToolbar = ({ editor }: Props) => {
    const EditorOptions = {
        bold: FormatBoldIcon,
        italic: FormatItalicIcon,
        underline: FormatUnderlinedIcon,
        strikethrough: FormatStrikethroughTwoTone,
        code: CodeIcon,
        blockQuote,
        codeBlock,
        link,
        HeadingDropDown,
        addUrlImage,
        orderedList,
        unorderedList,
        AlignDropDown,
    }

    return (
        <>
            {Object.keys(EditorOptions).map((option, index) => (
                <IconButton>
                    <FormatBoldIcon />
                </IconButton>
            ))}
        </>
    )

    // <div>
    //     <IconButton
    //         onClick={bold(editor)}
    //         sx={{
    //             '&:hover': {
    //                 borderRadius: '0px',
    //                 padding: '10px',
    //             },
    //         }}
    //     >
    //         <FormatBoldIcon />
    //     </IconButton>

    //     <button onClick={bold(editor)}>Bold</button>
    //     <button onClick={italic(editor)}>Italic</button>
    //     <button onClick={underline(editor)}>Underline</button>
    //     <button onClick={strikethrough(editor)}>StrikeThrough</button>
    //     <button onClick={code(editor)}>Code</button>
    //     <button onClick={blockQuote(editor)}>BlockQuote</button>
    //     <button onClick={codeBlock(editor)}>CodeBlock</button>
    //     <button onClick={link(editor)}>Link</button>
    //     <HeadingDropDown editor={editor} />
    //     <button onClick={addUrlImage(editor)}>Add image via URL</button>
    //     <button onClick={orderedList(editor)}>OrderedList</button>
    //     <button onClick={unorderedList(editor)}>UnorderedList</button>
    //     <AlignDropDown editor={editor} />
    // </div>
}

export default EditorToolbar
