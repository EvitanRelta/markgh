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
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setMdText } from '../../../../store/mdTextSlice'

type Props = {
    setAnchor: React.Dispatch<React.SetStateAction<(EventTarget & Element) | null>>
    menuOpen: boolean
    ghToken: string | undefined
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

const ImportGHRepo = ({ setAnchor, menuOpen, ghToken }: Props) => {
    const dispatch = useDispatch()
    const [showPopover, setShowPopover] = useState<boolean>(false)
    const [link, setLink] = useState<string>('')
    const [showError, setShowError] = useState<boolean>(false)
    const [showLoading, setShowLoading] = useState<boolean>(false)

    const openPopover = (e: React.MouseEvent) => {
        setShowPopover(true)
    }

    const closePopover = () => {
        setShowPopover(false)
        setShowError(false)
        setShowLoading(false)
        setAnchor(null)
    }

    const getRepo = () => {
        setShowLoading(true)
        console.log(ghToken)
        git.clone({
            fs,
            http,
            dir,
            corsProxy: 'https://cors.isomorphic-git.org',
            url: link,
            singleBranch: true,
            depth: 1,
            onAuth: () => ({
                username: ghToken,
                password: 'x-oauth-basic',
            }),
        })
            .catch((err) => {
                setShowError(true)
                console.log(err)
            })
            .then(() =>
                fs.readFile('/README.md', 'utf8', (err, data) => {
                    if (err) {
                        console.error(err)
                        dispatch(setMdText(''))
                        return
                    }
                    setAnchor(null)
                    dispatch(setMdText(data))
                    setShowPopover(false)
                    indexedDB.deleteDatabase('fs')
                    setShowLoading(false)
                })
            )
    }

    useEffect(() => {
        setShowPopover(menuOpen && showPopover)
        console.log(ghToken)
    }, [menuOpen])

    const linkInput = (
        <Box sx={{ padding: 1, paddingTop: 1.5 }}>
            <TextField
                error={showError}
                type='text'
                size='small'
                sx={{ minWidth: 300 }}
                label={'Repository Link'}
                placeholder={'https://github.com/user/project.git'}
                onChange={(e) => {
                    setLink(e.target.value)
                    setShowError(false)
                    setShowLoading(false)
                }}
                helperText={
                    (showError && 'Invalid link! (Repo has to be public)') ||
                    (showLoading && 'Loading...')
                }
            />
            <Button sx={{ marginLeft: 0.3 }} onClick={getRepo}>
                OK
            </Button>
        </Box>
    )

    return (
        <MenuItem divider sx={{ paddingBottom: 1.3 }} onClick={openPopover}>
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
