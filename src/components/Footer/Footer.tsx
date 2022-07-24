import { Button, styled } from '@mui/material'
import { setShowMarkdown } from '../../store/dataSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

const StyledShowMdButton = styled(Button)({
    minWidth: 169.42,
    margin: 0,
    right: 40,
    bottom: 40,
    position: 'fixed',
})

export const Footer = () => {
    const dispatch = useAppDispatch()
    const showMarkdown = useAppSelector((state) => state.data.showMarkdown)
    const theme = useAppSelector((state) => state.theme)

    const buttonColor = !showMarkdown ? undefined : theme === 'light' ? 'white' : 'black'

    return (
        <>
            {/* <ImageContainer /> */}
            <StyledShowMdButton
                sx={{
                    backgroundColor: buttonColor,
                    '&:hover': {
                        backgroundColor: buttonColor,
                    },
                }}
                onClick={() => dispatch(setShowMarkdown(!showMarkdown))}
                variant={showMarkdown ? 'outlined' : 'contained'}
            >
                {showMarkdown ? 'Hide Markdown' : 'Show Markdown'}
            </StyledShowMdButton>
        </>
    )
}
