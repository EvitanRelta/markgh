import { Button, styled, Tooltip } from '@mui/material'

interface Props {
    openVersions: (e: React.MouseEvent) => void
}

const StyledSnapshotButton = styled(Button)({
    display: 'inline-block',
    padding: 3,
    marginLeft: 5,
    marginRight: 5,
})

export const SnapshotOption = ({ openVersions }: Props) => {
    return (
        <Tooltip title='View Snapshots' disableInteractive arrow>
            <StyledSnapshotButton onClick={openVersions}>Snapshots</StyledSnapshotButton>
        </Tooltip>
    )
}
