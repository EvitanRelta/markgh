import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';

const ThemeOption = ({toggleTheme, theme}) => {
  return (
    <div>  <IconButton onClick={toggleTheme} color="inherit">
        {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon/>}
        </IconButton>
        {theme === "light"? "Dark" : "Light"} mode
        </div>
  )
}

export default ThemeOption