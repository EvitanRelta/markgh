import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ListItemIcon } from '@mui/material'
import { useAppSelector } from '../../../store/hooks'

type Props = {}

const ThemeOption = ({}: Props) => {
    const theme = useAppSelector((state) => state.theme)

    return (
        <>
            <ListItemIcon>
                {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </ListItemIcon>
            {theme === 'light' ? 'Dark' : 'Light'} mode
        </>
    )
}

export default ThemeOption
