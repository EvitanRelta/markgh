import Box from '@mui/material/Box'
import packageInfo from '../../../package.json'

export default () => (
    <Box
        style={{
            margin: 0,
            left: 40,
            bottom: 40,
            position: 'fixed',
            color: 'gray',
        }}
    >
        <strong>
            <em>version: {packageInfo.version}</em>
        </strong>
    </Box>
)
