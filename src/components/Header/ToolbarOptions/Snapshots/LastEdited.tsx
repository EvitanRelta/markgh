import { Box, styled } from '@mui/material'
import { useAppSelector } from '../../../../store/hooks'
import { SnapshotIcon } from './SnapshotIcon'

interface Props {
    openVersions: (e: React.MouseEvent) => void
}

const StyledText = styled(Box)({
    color: 'gray',
    paddingLeft: '5px',
    textDecoration: 'underline',
    fontSize: 14.5,
    display: 'inline-flex',
    marginTop: 8.5,
    cursor: 'pointer',
    marginLeft: 5,
    marginRight: 5,
})

export const LastEdited = ({ openVersions }: Props) => {
    const lastEditedOn = useAppSelector((state) => state.data.lastEditedOn)

    return (
        <>
            <StyledText onClick={openVersions} id='last-edited'>
                Last Edited on {lastEditedOn}
            </StyledText>
            <SnapshotIcon />
        </>
    )
}
