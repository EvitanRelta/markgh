import { Box } from '@mui/material'
import SnapshotIcon from './SnapshotIcon'

type Props = {
    lastEditedOn: string
    saveSnapshot: () => void
    openVersions: (e: React.MouseEvent) => void
}

const LastEdited = ({ lastEditedOn, saveSnapshot, openVersions }: Props) => {
    return (
        <Box>
            <Box id='last-edited' sx={{ display: 'inline-block' }}>
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
            </Box>
            <SnapshotIcon saveSnapshot={saveSnapshot} />
        </Box>
    )
}

export default LastEdited
