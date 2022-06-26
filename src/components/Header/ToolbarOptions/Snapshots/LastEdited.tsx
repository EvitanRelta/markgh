import { Box } from '@mui/material'
import { useState } from 'react'
import { EditorDB, Snapshot } from '../../../IndexedDB/initDB'
import SnapshotIcon from './SnapshotIcon'
import VersionIndex from './VersionIndex'

type Props = {
    lastEditedOn: string
    db: EditorDB
    snapshotArray: Snapshot[]
    updateSnapshots: () => Promise<void>
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
    saveSnapshot: () => void
}

const LastEdited = ({ lastEditedOn, db, snapshotArray, setTitle, saveSnapshot }: Props) => {
    const [showVersions, setShowVersions] = useState<(EventTarget & Element) | null>(null)

    const openVersions = (e: React.MouseEvent) => {
        setShowVersions(e.currentTarget)
    }

    const closeVersions = () => {
        setShowVersions(null)
    }

    return (
        <Box>
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
                <VersionIndex
                    anchorEl={showVersions}
                    onClose={closeVersions}
                    snapshotArray={snapshotArray}
                    setTitle={setTitle}
                    saveSnapshot={saveSnapshot}
                    closeVersions={closeVersions}
                />
            </Box>
            <SnapshotIcon saveSnapshot={saveSnapshot} />
        </Box>
    )
}

export default LastEdited
