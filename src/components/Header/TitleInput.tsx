import { Input, styled } from '@mui/material'
import { setFileTitle } from '../../store/dataSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

const StyledInput = styled(Input)({
    border: '0px',
    fontSize: '25px',
    width: '30%',
    marginLeft: 12,
    '&:before': {
        borderBottom: '0px',
        transform: 'scaleX(0)',
        transition: 'transform 150ms ease-in-out',
    },
    '&:hover': {
        '&&:before': {
            transform: 'scaleX(1)',
            borderBottom: '2px solid gray',
        },
    },
})

export const TitleInput = () => {
    const dispatch = useAppDispatch()
    const fileTitle = useAppSelector((state) => state.data.fileTitle)
    const theme = useAppSelector((state) => state.theme)

    //vars for theme control
    const themeColor = theme === 'dark' ? '#181414' : 'white'
    const textColor = theme === 'dark' ? 'white' : '#181414'

    return (
        <StyledInput
            type='text'
            placeholder='Untitled Document'
            value={fileTitle}
            onChange={(e) => dispatch(setFileTitle(e.target.value))}
            sx={{ backgroundColor: themeColor, color: textColor }}
        />
    )
}
