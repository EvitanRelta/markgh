import CameraAltIcon from '@mui/icons-material/CameraAlt'
import CheckIcon from '@mui/icons-material/Check'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'

interface Props {
    saveSnapshot: () => void
}

const SnapshotIcon = ({ saveSnapshot }: Props) => {
    const [saved, setSaved] = useState<boolean>(false)

    const onSnapshot = () => {
        //Disable clicking for icon for 1.5s, to prevent double click = double save
        if (!saved) {
            setSaved(true)
            saveSnapshot()
            setTimeout(() => setSaved(false), 1500)
        }
    }

    return (
        <IconButton
            sx={{
                padding: 0,
                marginLeft: 1,
                marginTop: -0.15,
                display: 'inline-flex',
            }}
            onClick={onSnapshot}
        >
            {!saved ? (
                <CameraAltIcon sx={{ fontSize: 17 }} />
            ) : (
                <CheckIcon sx={{ fontSize: 17, marginTop: 0 }} />
            )}
        </IconButton>
    )
}

export default SnapshotIcon
