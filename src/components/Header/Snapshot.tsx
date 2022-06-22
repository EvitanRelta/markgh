import CameraAltIcon from '@mui/icons-material/CameraAlt'
import CheckIcon from '@mui/icons-material/Check'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'

const Snapshot = () => {
    const [saved, setSaved] = useState<boolean>(false)

    const onSnapshot = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 1500)
    }

    return (
        <IconButton sx={{ padding: 0, marginLeft: 1, marginTop: -0.15, display: 'inline-flex' }}>
            {!saved ? (
                <CameraAltIcon sx={{ fontSize: 17 }} onClick={onSnapshot} />
            ) : (
                <CheckIcon sx={{ fontSize: 17, marginTop: 0 }} />
            )}
        </IconButton>
    )
}

export default Snapshot
