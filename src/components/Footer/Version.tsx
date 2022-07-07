import { Box, styled } from '@mui/material'
import packageInfo from '../../../package.json'

const StyledVersionContainer = styled(Box)({
    margin: 0,
    left: 40,
    bottom: 40,
    position: 'fixed',
    color: 'gray',
})

export const Version = () => {
    return (
        <StyledVersionContainer>
            <strong>
                <em>version: {packageInfo.version}</em>
            </strong>
        </StyledVersionContainer>
    )
}
