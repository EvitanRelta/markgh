import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useAppSelector } from '../../store/hooks'
import { EditorDB } from '../IndexedDB/initDB'
import ImageContainer from './ImageContainer'

type Props = {
    onClick: React.MouseEventHandler<HTMLButtonElement>
    showMarkdown: boolean
    db: EditorDB
}

const Footer = ({ onClick, showMarkdown, db }: Props) => {
    const theme = useAppSelector((state) => state.theme)

    return (
        <>
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
        </>
    )
}

export default Footer
