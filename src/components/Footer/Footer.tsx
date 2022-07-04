import { Button, styled } from '@mui/material'
import { useAppSelector } from '../../store/hooks'
import { EditorDB } from '../IndexedDB/initDB'
import { ImageContainer } from './ImageContainer'

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement>
    showMarkdown: boolean
    db: EditorDB
}

export const Footer = ({ onClick, showMarkdown, db }: Props) => {
    const theme = useAppSelector((state) => state.theme)

    const buttonColor = !showMarkdown ? undefined : theme === 'light' ? 'white' : 'black'

    const StyledShowMdButton = styled(Button)({
        minWidth: 169.42,
        margin: 0,
        right: 40,
        bottom: 40,
        position: 'fixed',
        backgroundColor: buttonColor,
        '&:hover': {
            backgroundColor: buttonColor,
        },
    })

    return (
        <>
            <ImageContainer db={db} />
            <StyledShowMdButton onClick={onClick} variant={showMarkdown ? 'outlined' : 'contained'}>
                {showMarkdown ? 'Hide Markdown' : 'Show Markdown'}
            </StyledShowMdButton>
        </>
    )
}
