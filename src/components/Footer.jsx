import Button from '@mui/material/Button'


const Footer = ({ onClick, showMarkdown }) => (
    <footer className='footer'>
        <div 
        // style={{
        //     marginTop: '100px',
        //     display: 'flex',
        //     justifyContent: 'center',
        //     alignItems: 'center'
        // }}
        style = {{
            margin: 0,
            top: 745,
            right: 40,
            bottom: 40,
            left: '20',
            position: 'fixed',
        }}>
            {
                showMarkdown
                    ? <Button onClick={onClick} variant="outlined">Hide Markdown</Button>
                    : <Button color='primary' onClick={onClick} variant="contained">Show Markdown</Button>
            }
        </div>
    </footer>
)

export default Footer