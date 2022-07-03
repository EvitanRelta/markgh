import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import IconButton from '@mui/material/IconButton'
import { useAppSelector } from '../../../store/hooks'

type Props = {}

const ThemeOption = ({}: Props) => {
    const theme = useAppSelector((state) => state.theme)

    return (
        <>
            <IconButton color='inherit'>
                {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            {theme === 'light' ? 'Dark' : 'Light'} mode
        </>
    )
}

export default ThemeOption
