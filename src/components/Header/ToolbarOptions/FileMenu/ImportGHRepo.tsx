import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import GitHubIcon from '@mui/icons-material/GitHub'
import { ListItemText, MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Popover from '@mui/material/Popover'
import TextField from '@mui/material/TextField'
import { GithubAuthProvider } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { githubProvider } from '../../../Authentication/config/authMethod'

type Props = {
    setAnchor: React.Dispatch<React.SetStateAction<(EventTarget & Element) | null>>
    menuOpen: boolean
    ghToken: string | undefined
    onLogin: (provider: GithubAuthProvider) => Promise<void>
}

function httpGet(theUrl: string) {
    let xmlhttp: XMLHttpRequest

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest()
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            return xmlhttp.responseText
        }
    }
    xmlhttp.open('GET', theUrl, false)
    xmlhttp.send()

    console.log(xmlhttp.response)
    return xmlhttp.response
}

const ImportGHRepo = ({ setAnchor, menuOpen, ghToken, onLogin }: Props) => {
    const editor = useSelector((state: RootState) => state.editor.editor)
    const [showPopover, setShowPopover] = useState<boolean>(false)
    const [link, setLink] = useState<string>('')
    const [showError, setShowError] = useState<boolean>(false)
    const [showLoading, setShowLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const openPopover = (e: React.MouseEvent) => {
        setShowPopover(true)
    }

    const closePopover = () => {
        setShowPopover(false)
        setShowError(false)
        setShowLoading(false)
        setAnchor(null)
    }

    const httpErrorHandling = (err: any) => {
        indexedDB.deleteDatabase('fs')
        const statusCode = err.data.statusCode

        if (statusCode >= 500) {
            setErrorMessage('Error ' + statusCode)
            setShowError(true)
        }

        if (statusCode !== 403 && statusCode !== 401) {
            setShowError(true)
            setErrorMessage(
                link.slice(-3) !== 'git'
                    ? "Link must end with 'git"
                    : 'Invalid Link! ' + (statusCode === undefined ? '404' : statusCode)
            )
            return
        }

        onLogin(githubProvider).then(() => setAnchor(null))
    }

    const getRepo = () => {
        setShowLoading(false)

        const generateRawURL = (url: string) => {
            // https://github.com/ShenyiCui/simple_form-bootstrap
            const urlInfo = url.split('https://github.com/')[1].split('/')
            const [user, repo] = urlInfo
            const rawLink = `https://raw.githubusercontent.com/${user}/${repo}/master/README.md`

            return rawLink
        }

        let res = httpGet(generateRawURL(link))
    }

    useEffect(() => {
        if (!menuOpen) {
            setShowPopover(false)
        }
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
                helperText={showError ? errorMessage : null}
            />
            {showLoading && !showError ? (
                <Box sx={{ marginRight: 2.1, marginLeft: 0.5, display: 'inline' }}>
                    <CircularProgress size={25} sx={{ marginTop: 0.8 }} />
                </Box>
            ) : (
                <Button sx={{ marginLeft: 0.9 }} onClick={getRepo}>
                    OK
                </Button>
            )}
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
