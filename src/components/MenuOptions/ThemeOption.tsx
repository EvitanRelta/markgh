import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import IconButton from '@mui/material/IconButton'

type Props = {
    theme: string;
}

const ThemeOption = ({ theme }: Props) => {
    return (
        <div>
            <IconButton color="inherit">
                {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            {theme === "light" ? "Dark" : "Light"} mode
        </div>
    )
}

export default ThemeOption