import { Box } from '@mui/material'
import { ExportOption } from './ExportMenu/ExportOption'
import { FileOption } from './FileMenu/FileOption'
import { SnapshotOption } from './Snapshots/SnapshotOption'

interface Props {
    openVersions: (e: React.MouseEvent) => void
}

export const ToolbarContainer = ({ openVersions }: Props) => {
    return (
        <Box>
            <FileOption />
            <ExportOption />
            <SnapshotOption openVersions={openVersions} />
        </Box>
    )
}
