import { Box, Button } from '@mui/material'

interface Props {
    openVersions: (e: React.MouseEvent) => void
}

const SnapshotOption = ({ openVersions }: Props) => {
    return (
        <Box sx={{ display: 'inline-block' }}>
            <Button style={{ padding: 3 }} onClick={openVersions}>
                Snapshots
            </Button>
        </Box>
    )
}

export default SnapshotOption
