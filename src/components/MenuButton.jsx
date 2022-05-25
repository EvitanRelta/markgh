import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import { Menu, MenuItem } from "@mui/material"
import { useState, } from 'react'
import UploadFileOption from './UploadFileOption';
import ExportMarkdownOption from './ExportMarkdownOption'
import ThemeOption from './ThemeOption'

const MenuButton = ({theme, toggleTheme, title, onUpload}) => {

    
    const [anchor, setAnchor] = useState(null)
    //const [selected, setSelected] = useState(-1)

    
    const openMenu = (e) => {
        setAnchor(e.currentTarget)
    }

    const closeMenu = () => {
        setAnchor(null)
    }

    const onDownload = () => {
        const element = document.createElement("a");
        const file = new Blob(['test export'], {type: "text/plain;charset=utf-8"})
        element.href = URL.createObjectURL(file)    ;
        element.download = (title === '' ? "NewFile" : title) + ".md";
        document.body.appendChild(element);
        element.click()
    }


    



  return (
    <div>
        <IconButton>
            <MoreHorizIcon onClick = { openMenu }/>
        </IconButton>
        <Menu open = { Boolean(anchor) } keepMounted
         anchorEl = {anchor} onClose = { closeMenu }>
          <MenuItem style = {{padding: "0px"}}><UploadFileOption onUpload = {onUpload}/></MenuItem>
          <MenuItem onClick = { onDownload } ><ExportMarkdownOption title = {title} /></MenuItem>
          <MenuItem onClick = { toggleTheme }><ThemeOption theme = {theme}/></MenuItem>
        </Menu>
    </div>
  )
}

export default MenuButton