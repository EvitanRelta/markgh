import { MenuItem } from '@mui/material'
import { useState } from 'react'
import { PushGHDialog } from './PushGHDialog'

export const PushGH = () => {
    const [showDialog, setShowDialog] = useState(false)

    return (
        <>
            <MenuItem onClick={() => setShowDialog(true)}>Push README to Repo</MenuItem>
            {showDialog && <PushGHDialog setShowDialog={setShowDialog} />}
        </>
    )
}
