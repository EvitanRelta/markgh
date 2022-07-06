import { Box, styled } from '@mui/material'
import packageInfo from '../../../package.json'

export const Version = () => {
    const StyledVersionContainer = styled(Box)({
        margin: 0,
        left: 40,
        bottom: 40,
        position: 'fixed',
        color: 'gray',
    })

    return (
        <StyledVersionContainer>
            <strong>
                <em>version: {packageInfo.version}</em>
            </strong>
        </StyledVersionContainer>
    )
}
