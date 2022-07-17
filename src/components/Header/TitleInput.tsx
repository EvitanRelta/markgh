import { Input, styled } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { setFileTitle } from '../../store/dataSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

const StyledInput = styled(Input)({
    border: '0px',
    fontSize: '25px',
    minWidth: '20em',
    marginLeft: 12,
    marginRight: 20,
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

const getFont = (element: Element) => {
    const getCssStyle = (element: Element, prop: string) =>
        window.getComputedStyle(element, null).getPropertyValue(prop)
    const fontWeight = getCssStyle(element, 'font-weight') || 'normal'
    const fontSize = getCssStyle(element, 'font-size') || '16px'
    const fontFamily = getCssStyle(element, 'font-family') || 'Times New Roman'
    return `${fontWeight} ${fontSize} ${fontFamily}`
}

const context = document.createElement('canvas').getContext('2d')!
const getTextWidth = (text: string, font: string) => {
    context.font = font
    const { width } = context.measureText(text)
    return width
}

export const TitleInput = () => {
    const dispatch = useAppDispatch()
    const fileTitle = useAppSelector((state) => state.data.fileTitle)
    const theme = useAppSelector((state) => state.theme)
    const inputRef = useRef<HTMLInputElement>()
    const [width, setWidth] = useState<number | undefined>(undefined)

    useEffect(() => {
        const newWidth = !inputRef.current
            ? undefined
            : getTextWidth(fileTitle, getFont(inputRef.current)) * 1.05 + 25
        setWidth(newWidth)
    }, [setWidth, inputRef, fileTitle])

    //vars for theme control
    const themeColor = theme === 'dark' ? '#181414' : 'white'
    const textColor = theme === 'dark' ? 'white' : '#181414'

    return (
        <StyledInput
            type='text'
            placeholder='Untitled Document'
            value={fileTitle}
            inputRef={inputRef}
            onChange={(e) => dispatch(setFileTitle(e.target.value))}
            sx={{
                backgroundColor: themeColor,
                color: textColor,
                width,
            }}
        />
    )
}
