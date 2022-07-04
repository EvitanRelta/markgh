import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon } from '@mui/icons-material'
import { ListItemIcon } from '@mui/material'
import { useAppSelector } from '../../../store/hooks'

export const ThemeOption = () => {
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
