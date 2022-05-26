
import Button from '@mui/material/Button';

const Footer = ({ onClick, showMarkdown }) => {

    
    return (
      <footer className = 'footer'>
      <p style = {{ 
        marginTop: '100px',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
        }}>
      {showMarkdown ? 
      <Button onClick = {onClick} variant="outlined">Hide Markdown</Button> :
      <Button color = 'primary' onClick = {onClick} variant= "contained">Show Markdown</Button> }
      </p>
      
      </footer>
    )
  }
  
  export default Footer