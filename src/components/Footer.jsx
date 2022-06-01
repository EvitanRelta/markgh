import Button from '@mui/material/Button'


const Footer = ({ onClick, showMarkdown, theme }) => (
    <footer className='footer'>
        <div
            style={{
                margin: 0,
                right: 40,
                bottom: 40,
                position: 'fixed',
            }}>
            {
                showMarkdown
                    ? <Button onClick={onClick} variant="outlined"
                        style={{ backgroundColor: theme === 'light' ? 'white' : 'black', minWidth: 169.42 }}>Hide Markdown</Button>
                    : <Button color='primary' onClick={onClick} variant="contained">Show Markdown</Button>
            }
        </div>
    </footer>
)

export default Footer