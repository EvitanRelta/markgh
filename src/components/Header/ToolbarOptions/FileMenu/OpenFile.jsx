import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import { MenuItem } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'

const OpenFile = ({ onUpload }) => {
    return (
        <MenuItem style={{ padding: 0 }}>
            <label
                style={{
                    cursor: 'pointer',
                    minWidth: 250,
                }}
            >
                <div style={{ display: 'none' }}>
                    <Input type='file' onChange={onUpload} />
                </div>
                <div
                    style={{
                        display: 'inline-block',
                        marginRight: 6,
                        paddingLeft: 11,
                    }}
                >
                    <IconButton component='span'>
                        <FolderOpenIcon />
                    </IconButton>
                </div>
                <span>Open...</span>
            </label>
        </MenuItem>
    )
}

export default OpenFile
