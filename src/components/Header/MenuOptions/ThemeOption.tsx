import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

type Props = {}

const ThemeOption = ({}: Props) => {
    const theme = useSelector((state: RootState) => state.theme)

    return (
        <Box style={{ cursor: 'pointer', minWidth: 140, marginLeft: -2 }}>
            <IconButton color='inherit'>
                {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            {theme === 'light' ? 'Dark' : 'Light'} mode
        </Box>
    )
}

export default ThemeOption
