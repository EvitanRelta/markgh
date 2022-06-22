import { Box } from '@mui/material'
import { useState } from 'react'
import VersionIndex from './VersionIndex'

type Props = {
    lastEditedOn: string
}

const LastEdited = ({ lastEditedOn }: Props) => {
    const [showVersions, setShowVersions] = useState<(EventTarget & Element) | null>(null)

    const openVersions = (e: React.MouseEvent) => {
        setShowVersions(e.currentTarget)
        console.log('click')
    }

    const closeVersions = () => {
        console.log('close')
        setShowVersions(null)
        console.log(showVersions)
        console.log(Boolean(null))
    }

    return (
        <Box sx={{ display: 'inline-flex' }}>
            <Box
                onClick={openVersions}
                sx={{
                    color: 'gray',
                    paddingLeft: '5px',
                    textDecoration: 'underline',
                    fontSize: 14.5,
                    display: 'inline-flex',
                    marginTop: 0.5,
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
