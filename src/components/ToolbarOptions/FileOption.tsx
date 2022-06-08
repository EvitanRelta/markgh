import { Menu } from "@mui/material"
import Button from '@mui/material/Button'
import { useState } from 'react'
import OpenFile from './FileMenu/OpenFile'

type Props = {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OpenFileOption = ({ onUpload }: Props) => {

  const [anchor, setAnchor] = useState<EventTarget & Element | null>(null)

  const openMenu = (e: React.MouseEvent) => {
    setAnchor(e.currentTarget)
  }

  const closeMenu = () => {
      setAnchor(null)
  }

  return (
    <div>
      <Button onClick={openMenu}>File</Button>
      <Menu open={Boolean(anchor)} keepMounted anchorEl={anchor} onClose={closeMenu}>
        <OpenFile onUpload = {onUpload}/>
      </Menu>
    </div>
  )
}

export default OpenFileOption