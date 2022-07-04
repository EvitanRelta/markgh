import { Box } from '@mui/material'
import Button from '@mui/material/Button'

interface Props {
    openVersions: (e: React.MouseEvent) => void
}

const FileOption = ({ openVersions }: Props) => {
    return (
        <Box sx={{ display: 'inline-block' }}>
            <Button style={{ padding: 3 }} onClick={openVersions}>
                Snapshots
            </Button>
        </Box>
    )
}

export default FileOption
