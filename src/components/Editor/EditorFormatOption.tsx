import { Box, IconButton, styled, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { FormatOption } from './EditorToolbar'

const StyledTooltipText = styled(Box)({
    textAlign: 'center',
})

const StyledTooltipHotkeyText = styled(Box)({
    fontStyle: 'italic',
    fontSize: 9,
})

const StyledIconButton = styled(IconButton)({
    transition: 'none',
    '&:hover': {
        borderRadius: 1,
    },
    marginTop: -1,
    borderRadius: 1,
})

interface Props {
    option: FormatOption
}

export const EditorFormatOption = ({ option }: Props) => {
    const editor = useAppSelector((state) => state.data.editor)
    const [isActive, setIsActive] = useState(false)
    const [bgColor, setBgColor] = useState<string | undefined>(undefined)
    const attributeName = typeof option === 'object' ? option.attributeName : ''

    //Changes icon color if it's active, unless its excluded from activation (non-toggle-able actions)
    useEffect(() => {
        isActive ? setBgColor('#3178d2') : setBgColor(undefined)
    }, [isActive])

    useEffect(() => {
        if (!editor) return

        type OnTransactionCallback = Parameters<typeof editor.on<'transaction'>>[1]
        const updateAttributeActive: OnTransactionCallback = ({ editor }) => {
            setIsActive(editor.isActive(attributeName))
        }

        editor.on('transaction', updateAttributeActive)

        return () => {
            editor.off('transaction', updateAttributeActive)
        }
    }, [editor, setIsActive, attributeName])

    if (typeof option !== 'object') {
        const FormatOptionComponent = option
        return <FormatOptionComponent editor={editor} />
    }
    const { name, toolbarFunction, icon: FormatOptionIcon, hotkey } = option

    const tooltipTitle = (
        <StyledTooltipText>
            {name}
            <StyledTooltipHotkeyText sx={{ fontStyle: 'italic', fontSize: 9 }}>
                {hotkey}
            </StyledTooltipHotkeyText>
        </StyledTooltipText>
    )

    return (
        <Tooltip title={tooltipTitle} disableInteractive arrow>
            <StyledIconButton sx={{ color: bgColor }} onClick={toolbarFunction(editor)}>
                <FormatOptionIcon />
            </StyledIconButton>
        </Tooltip>
    )
}
