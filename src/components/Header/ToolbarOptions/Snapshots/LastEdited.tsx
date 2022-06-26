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
    setDocumentName: React.Dispatch<React.SetStateAction<string>>
}

const LastEdited = ({
    lastEditedOn,
    db,
    snapshotArray,
    updateSnapshots,
    title,
    setDocumentName,
}: Props) => {
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
                    setDocumentName={setDocumentName}
                />
            </Box>
            <SnapshotIcon
                db={db}
                snapshotArray={snapshotArray}
                updateSnapshots={updateSnapshots}
                savedOn={lastEditedOn}
                title={title}
            />
        </Box>
    )
}

export default LastEdited
