import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon } from '@mui/icons-material'
import { ListItemIcon, MenuItem, styled } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { toggleTheme } from '../../../store/themeSlice'

interface Props {
    closeMenu: () => void
}

const StyledMenuItem = styled(MenuItem)({
    padding: 15,
    minWidth: 190,
})

const StyledListItemIcon = styled(ListItemIcon)({
    marginLeft: -1,
    marginRight: 2,
})

export const ThemeOption = ({ closeMenu }: Props) => {
    const theme = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()

    const handleChangeTheme = () => {
        dispatch(toggleTheme())
        closeMenu()
    }

    return (
        <StyledMenuItem onClick={handleChangeTheme}>
            <StyledListItemIcon>
                {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </StyledListItemIcon>
            {theme === 'light' ? 'Dark' : 'Light'} mode
        </StyledMenuItem>
    )
}
