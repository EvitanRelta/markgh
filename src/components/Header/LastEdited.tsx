import { Box } from '@mui/material'
import { useState } from 'react'
import VersionIndex from './ToolbarOptions/Snapshots/VersionIndex'

type Props = {
    lastEditedOn: string
}

const LastEdited = ({ lastEditedOn }: Props) => {
    const [showVersions, setShowVersions] = useState<(EventTarget & Element) | null>(null)

    const openVersions = (e: React.MouseEvent) => {
        setShowVersions(e.currentTarget)
    }

    const closeVersions = () => {
        setShowVersions(null)
    }

    return (
        <Box sx={{ display: 'inline-block' }}>
            <Box
                onClick={openVersions}
                sx={{
                    color: 'gray',
                    paddingLeft: '5px',
                    textDecoration: 'underline',
                    fontSize: 14.5,
                    display: 'inline-flex',
                    marginTop: 0.8,
                    paddingTop: 0.15,
                    cursor: 'pointer',
                }}
            >
                Last Edited on {lastEditedOn}
            </Box>
            <VersionIndex anchorEl={showVersions} onClose={closeVersions} />
        </Box>
    )
}

export default LastEdited
