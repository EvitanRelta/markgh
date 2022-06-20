import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import { MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'

const OpenFile = ({ onUpload }) => {
    return (
        <MenuItem style={{ padding: 0 }}>
            <label style={{ cursor: 'pointer', minWidth: 250 }}>
                <Box style={{ display: 'none' }}>
                    <Input type='file' onChange={onUpload} />
                </Box>
                <Box
                    style={{
                        display: 'inline-block',
                        marginRight: 6,
                        paddingLeft: 11,
                    }}
                >
                    <IconButton component='span'>
                        <FolderOpenIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'inline' }}>Open...</Box>
            </label>
        </MenuItem>
    )
}

export default OpenFile
