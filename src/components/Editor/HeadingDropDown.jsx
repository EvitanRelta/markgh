import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Menu, MenuItem } from '@mui/material'
import Button from '@mui/material/Button'
import { useState } from 'react'
import heading from './toolbarFunctions/heading'

// interface Props {
//     editor: Editor | null;
// }

const HeadingDropDown = ({ editor }) => {
    const [anchor, setAnchor] = useState(null)

    const openMenu = (e) => {
        setAnchor(e.currentTarget)
    }

    const closeMenu = () => {
        setAnchor(null)
    }

    const getHeadingLevel = (editor) => {
        if (editor.isActive('paragraph')) return 0

        // If multiple different headings types are selected, 'headingAttr.level'
        // will have a value, but 'editor.isActive('heading')' will be false.
        if (!editor.isActive('heading')) return null

        const headingAttr = editor.getAttributes('heading')

        return headingAttr.level === undefined ? null : headingAttr.level
    }

    const headingLevel = editor ? getHeadingLevel(editor) : null

    const onChange = (value) => {
        heading(editor)(value)
        closeMenu()
    }

    const headingOptions = [1, 2, 3, 4, 5, 6, 0]

    return (
        <div style={{ display: 'inline' }}>
            <Button
                onClick={openMenu}
                sx={{
                    textTransform: 'none',
                    color: 'black',
                    borderLeft: '1px solid #d0cccc',
                    borderRight: '1px solid #d0cccc',
                    minWidth: 117.43,
                    maxHeight: 25,
                    paddingRight: 0.5,
                    paddingLeft: 1.5,
                    borderRadius: 0,
                    display: 'flex inline',
                    justifyContent: 'space-between',
                    marginTop: -1,
                }}
            >
                <span style={{ display: 'inline' }}>
                    {headingLevel === 0
                        ? 'Normal'
                        : headingLevel === null
                        ? ''
                        : 'Heading ' + headingLevel}
                </span>
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
            <Menu
                open={Boolean(anchor)}
                keepMounted
                anchorEl={anchor}
                onClose={closeMenu}
            >
                {headingOptions.map((value, index) => (
                    <MenuItem key={index} onClick={() => onChange(value)}>
                        {value === 0 ? 'Normal' : 'Heading ' + value}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default HeadingDropDown
