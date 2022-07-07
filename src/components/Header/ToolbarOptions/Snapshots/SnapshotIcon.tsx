import { CameraAlt as CameraAltIcon, Check as CheckIcon } from '@mui/icons-material'
import { IconButton, styled } from '@mui/material'
import { useState } from 'react'

interface Props {
    saveSnapshot: () => void
}

const StyledIconButton = styled(IconButton)({
    padding: 0,
    marginLeft: 7,
    marginTop: -0.15,
    display: 'inline-flex',
})

export const SnapshotIcon = ({ saveSnapshot }: Props) => {
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
        <StyledIconButton onClick={onSnapshot}>
            {!saved ? (
                <CameraAltIcon sx={{ fontSize: 17 }} />
            ) : (
                <CheckIcon sx={{ fontSize: 17, marginTop: 0 }} />
            )}
        </StyledIconButton>
    )
}
