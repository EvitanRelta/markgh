import { Button, styled } from '@mui/material'

interface Props {
    openVersions: (e: React.MouseEvent) => void
}

const StyledSnapshotButton = styled(Button)({
    display: 'inline-block',
    padding: 3,
})

export const SnapshotOption = ({ openVersions }: Props) => {
    return <StyledSnapshotButton onClick={openVersions}>Snapshots</StyledSnapshotButton>
}
