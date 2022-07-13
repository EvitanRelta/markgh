import FS from '@isomorphic-git/lightning-fs'
import { Dialog, MenuItem } from '@mui/material'
import { useState } from 'react'

const fs = new FS('fs')
const dir = '/'
window.global = window
window.Buffer = window.Buffer || require('buffer').Buffer

export const PushGH = () => {
    const [showDialog, setShowDialog] = useState(false)

    const pushInputDialog = <Dialog open={showDialog} onClose={() => setShowDialog(false)}></Dialog>

    return (
        <>
            <MenuItem onClick={() => setShowDialog(true)}>Push README to Repo</MenuItem>
            {pushInputDialog}
        </>
    )
}
