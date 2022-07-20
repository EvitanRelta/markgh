import { Box } from '@mui/material'
import { ExportOption } from './ExportMenu/ExportOption'
import { ImportOption } from './ImportMenu/ImportOption'
import { SnapshotOption } from './Snapshots/SnapshotOption'

interface Props {
    openVersions: (e: React.MouseEvent) => void
}

export const ToolbarContainer = ({ openVersions }: Props) => {
    return (
        <Box>
            <ImportOption />
            <ExportOption />
            <SnapshotOption openVersions={openVersions} />
        </Box>
    )
}
