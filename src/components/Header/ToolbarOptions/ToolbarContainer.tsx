import { Box, styled } from '@mui/material'
import { ExportOption } from './ExportMenu/ExportOption'
import { ImportOption } from './ImportMenu/ImportOption'
import { SnapshotOption } from './Snapshots/SnapshotOption'

interface Props {
    openVersions: (e: React.MouseEvent) => void
}

const StyledToolbarContainer = styled(Box)({
    marginLeft: 4,
})

export const ToolbarContainer = ({ openVersions }: Props) => {
    return (
        <StyledToolbarContainer>
            <ImportOption />
            <ExportOption />
            <SnapshotOption openVersions={openVersions} />
        </StyledToolbarContainer>
    )
}
