import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import GitHubIcon from '@mui/icons-material/GitHub'
import { ListItemText, MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

const ImportGHRepo = () => {
    const [showPopover, setShowPopover] = useState<boolean>(false)
    const [link, setLink] = useState<string>('')

    const openPopover = (e: React.MouseEvent) => {
        setShowPopover(true)
    }

    const closePopover = () => {
        setShowPopover(false)
    }

    const linkInput = (
        <Box sx={{ padding: 1 }}>
            <TextField
                type='text'
                size='small'
                sx={{ minWidth: 300 }}
                label={'Repository Link'}
                placeholder={'https://github.com/user/project.git'}
                onChange={(e) => setLink(e.target.value)}
            />
            <Button sx={{ marginLeft: 0.3 }}>OK</Button>
        </Box>
    )

    return (
        <MenuItem divider sx={{ paddingBottom: 1.3 }} onMouseEnter={closePopover}>
            <GitHubIcon sx={{ marginLeft: 0.5 }} />
            <ListItemText sx={{ marginLeft: 1.7 }}>Import from GitHub...</ListItemText>
            <ArrowForwardIosIcon
                sx={{ fontSize: 'small', marginLeft: 3 }}
                onMouseEnter={openPopover}
                id='popover'
            />
            <Popover
                sx={{ marginLeft: 3.8, marginTop: -2.5 }}
                open={showPopover}
                onClose={closePopover}
                anchorEl={document.getElementById('popover')}
                disableRestoreFocus
            >
                {linkInput}
            </Popover>
        </MenuItem>
    )
}

export default ImportGHRepo
