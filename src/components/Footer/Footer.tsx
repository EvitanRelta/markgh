import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dexie from 'dexie'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import ImageContainer from './ImageContainer'

type Props = {
    onClick: React.MouseEventHandler<HTMLButtonElement>
    showMarkdown: boolean
    db: Dexie
}
const Footer = ({ onClick, showMarkdown, db }: Props) => {
    const theme = useSelector((state: RootState) => state.theme)

    return (
        <Box className='footer'>
            <ImageContainer db={db} />
            <Box
                style={{
                    margin: 0,
                    right: 40,
                    bottom: 40,
                    position: 'fixed',
                }}
            >
                {showMarkdown ? (
                    <Button
                        onClick={onClick}
                        variant='outlined'
                        style={{
                            backgroundColor: theme === 'light' ? 'white' : 'black',
                            minWidth: 169.42,
                        }}
                    >
                        Hide Markdown
                    </Button>
                ) : (
                    <Button color='primary' onClick={onClick} variant='contained'>
                        Show Markdown
                    </Button>
                )}
            </Box>
        </Box>
    )
}

export default Footer
