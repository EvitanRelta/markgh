import FS from '@isomorphic-git/lightning-fs'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import GitHubIcon from '@mui/icons-material/GitHub'
import { ListItemText, MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import TextField from '@mui/material/TextField'
import git from 'isomorphic-git'
import http from 'isomorphic-git/http/web'
import { useState } from 'react'

type Props = {
    setMdText: React.Dispatch<React.SetStateAction<string | Uint8Array>>
    setAnchor: React.Dispatch<React.SetStateAction<(EventTarget & Element) | null>>
}

const fs = new FS(
    'fs'
    //cant get this to work in typescript, but it would be good to have this option. Using workaround for now.
    //clears previous git clones in FS on refresh
    //{wipe: true}
)

const dir = '/'
window.global = window
window.Buffer = window.Buffer || require('buffer').Buffer

const ImportGHRepo = ({ setMdText, setAnchor }: Props) => {
    const [showPopover, setShowPopover] = useState<boolean>(false)
    const [link, setLink] = useState<string>('')
    const [linkError, setLinkError] = useState(false)

    const openPopover = (e: React.MouseEvent) => {
        setShowPopover(true)
    }

    const closePopover = () => {
        setShowPopover(false)
    }

    const getRepo = () => {
        git.clone({
            fs,
            http,
            dir,
            corsProxy: 'https://cors.isomorphic-git.org',
            url: link,
            singleBranch: true,
            depth: 1,
        })
            .catch((err) => {
                setLinkError(true)
                console.log(err)
            })
            .then(() =>
                fs.readFile('/README.md', 'utf8', (err, data) => {
                    if (err) {
                        console.error(err)
                        setMdText('')
                        return
                    }
                    setAnchor(null)
                    setMdText(data)
                    setShowPopover(false)
                    indexedDB.deleteDatabase('fs')
                })
            )
    }

    const linkInput = (
        <Box sx={{ padding: 1 }}>
            <TextField
                error={linkError}
                type='text'
                size='small'
                sx={{ minWidth: 300 }}
                label={'Repository Link'}
                placeholder={'https://github.com/user/project.git'}
                onChange={(e) => setLink(e.target.value)}
                helperText={linkError && 'Invalid link! (Repo has to be public)'}
            />
            <Button sx={{ marginLeft: 0.3 }} onClick={getRepo}>
                OK
            </Button>
        </Box>
    )

    return (
        <MenuItem divider sx={{ paddingBottom: 1.3 }} onMouseEnter={closePopover}>
            <GitHubIcon sx={{ marginLeft: 0.5 }} />
            <ListItemText sx={{ marginLeft: 1.7 }}>Import from GitHub...</ListItemText>
            <ArrowForwardIosIcon
                sx={{ fontSize: 'small', marginLeft: 3 }}
                onMouseEnter={openPopover}
                id='popover'
            />
            <Popover
                sx={{ marginLeft: 3.8, marginTop: -2.5 }}
                open={showPopover}
                onClose={closePopover}
                anchorEl={document.getElementById('popover')}
                disableRestoreFocus
            >
                {linkInput}
            </Popover>
        </MenuItem>
    )
}

export default ImportGHRepo
