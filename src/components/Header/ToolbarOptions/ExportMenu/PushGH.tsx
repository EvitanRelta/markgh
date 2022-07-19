import { PostAdd as PostAddIcon } from '@mui/icons-material'
import { MenuItem, styled } from '@mui/material'
import { useState } from 'react'
import { PushGHDialog } from './PushGHDialog'

const StyledPostAddIcon = styled(PostAddIcon)({
    marginRight: 10,
    marginLeft: 10,
    fontSize: 25,
})

const StyledMenuItem = styled(MenuItem)({
    padding: 10,
    minWidth: 250,
})

export const PushGH = () => {
    const [showDialog, setShowDialog] = useState(false)

    return (
        <>
            <StyledMenuItem onClick={() => setShowDialog(true)}>
                <StyledPostAddIcon />
                Push Readme to Repo
            </StyledMenuItem>
            {showDialog && <PushGHDialog setShowDialog={setShowDialog} />}
        </>
    )
}
