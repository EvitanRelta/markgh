import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Menu, MenuItem } from "@mui/material"
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'
import { toMarkdown } from '../converterFunctions'
import ExportMarkdownOption from './MenuOptions/ExportMarkdownOption'
import ThemeOption from './MenuOptions/ThemeOption'
import UploadFileOption from './MenuOptions/UploadFileOption'


const MenuButton = ({ theme, toggleTheme, title, onUpload }) => {
    const [anchor, setAnchor] = useState(null)
    //const [selected, setSelected] = useState(-1)

    const openMenu = (e) => {
        setAnchor(e.currentTarget)
    }

    const closeMenu = () => {
        setAnchor(null)
    }

    const onDownload = () => {
        const fileName = `${title || "NewFile"}.md`
        const markdownText = toMarkdown(document.getElementsByClassName('ql-editor')[0])
        downloadText(markdownText, fileName)
    }

    const downloadText = (text, fileName) => {
        const element = document.createElement("a")
        const file = new Blob([text], { type: "text/plain;charset=utf-8" })
        element.href = URL.createObjectURL(file)
        element.download = fileName
        element.hidden = true
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }


    return (
        <div>
            <IconButton onClick={openMenu}>
                <MoreHorizIcon />
            </IconButton>
            <Menu open={Boolean(anchor)} keepMounted
                anchorEl={anchor} onClose={closeMenu}>
                <MenuItem style={{ padding: "0px" }}><UploadFileOption onUpload={onUpload} /></MenuItem>
                <MenuItem onClick={onDownload} ><ExportMarkdownOption title={title} /></MenuItem>
                <MenuItem onClick={toggleTheme}><ThemeOption theme={theme} /></MenuItem>
            </Menu>
        </div>
    )
}

export default MenuButton