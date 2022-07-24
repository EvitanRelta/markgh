import { Box, IconButton, styled, Tooltip } from '@mui/material'
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
})

interface Props {
    option: FormatOption
}

export const EditorFormatOption = ({ option }: Props) => {
    const editor = useAppSelector((state) => state.data.editor)
    if (typeof option !== 'object') {
        const FormatOptionComponent = option
        return <FormatOptionComponent editor={editor} />
    }
    const { name, toolbarFunction, icon: FormatOptionIcon } = option

    const tooltipTitle = (
        <StyledTooltipText>
            {name}
            <StyledTooltipHotkeyText
                sx={{ fontStyle: 'italic', fontSize: 9 }}
            ></StyledTooltipHotkeyText>
        </StyledTooltipText>
    )

    return (
        <Tooltip title={tooltipTitle} disableInteractive arrow>
            <StyledIconButton onClick={toolbarFunction(editor)}>
                <FormatOptionIcon />
            </StyledIconButton>
        </Tooltip>
    )
}
