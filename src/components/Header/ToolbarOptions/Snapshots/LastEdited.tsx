import { Box, styled } from '@mui/material'
import { SnapshotIcon } from './SnapshotIcon'

interface Props {
    lastEditedOn: string
    saveSnapshot: () => void
    openVersions: (e: React.MouseEvent) => void
}

const StyledText = styled(Box)({
    color: 'gray',
    paddingLeft: '5px',
    textDecoration: 'underline',
    fontSize: 14.5,
    display: 'inline-flex',
    marginTop: 8,
    paddingTop: 0.15,
    cursor: 'pointer',
})

export const LastEdited = ({ lastEditedOn, saveSnapshot, openVersions }: Props) => {
    return (
        <>
            <StyledText onClick={openVersions} id='last-edited'>
                Last Edited on {lastEditedOn}
            </StyledText>
            <SnapshotIcon saveSnapshot={saveSnapshot} />
        </>
    )
}
