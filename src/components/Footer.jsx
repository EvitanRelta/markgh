
import Button from '@mui/material/Button';

const Footer = ({ onClick, showMarkdown }) => {

    
    return (
      <footer className = 'footer'>
      {showMarkdown ? 
      <Button onClick = {onClick} variant="outlined">Hide Markdown</Button> :
      <Button color = 'primary' onClick = {onClick}variant= "contained">Show Markdown</Button> }
      </footer>
    )
  }
  
  export default Footer