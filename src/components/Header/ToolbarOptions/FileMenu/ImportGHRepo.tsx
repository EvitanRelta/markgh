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
//import { githubProvider } from '../../../Authentication/config/authMethod'

type Props = {
    setAnchor: React.Dispatch<React.SetStateAction<(EventTarget & Element) | null>>
    menuOpen: boolean
    ghToken: string | undefined
    onLogin: (provider: GithubAuthProvider) => Promise<void>
}

const ImportGHRepo = ({ setAnchor, menuOpen, ghToken, onLogin }: Props) => {
    const editor = useSelector((state: RootState) => state.editor.editor)
    const [showPopover, setShowPopover] = useState<boolean>(false)
    const [link, setLink] = useState<string>('')
    const [showError, setShowError] = useState<boolean>(false)
    const [showLoading, setShowLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const generateRawURL = (url: string) => {
        const urlInfo = url.split('https://github.com/')[1].split('/')
        const [user, repo] = urlInfo
        //to implement branch name input  (default as master)
        //corsproxy needs to be changed
        const rawLink = `https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/${user}/${repo}/master/README.md`

        return rawLink
    }

    const httpErrorHandling = (statusCode: number) => {
        //probably 404 error, if repo is private or typo
        if (statusCode < 500) {
            //onLogin(githubProvider)
            //if still fails, invalid link
        }

        if (statusCode >= 500) {
            setErrorMessage('GitHub servers maybe down...')
        }
    }

    const httpGet = (theUrl: string) => {
        console.log(theUrl)
        let xmlHttp: XMLHttpRequest

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlHttp = new XMLHttpRequest()
        } else {
            // code for IE6, IE5
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
        }

        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                return xmlHttp.responseText
            }
            return false //returns false if error, use this conditional for checking error later
        }
        xmlHttp.open('GET', theUrl, false)
        //for private repos, but CORS issues
        xmlHttp.setRequestHeader('Authorization', 'Bearer ' + ghToken)
        xmlHttp.send()

        console.log(xmlHttp.response)
        return xmlHttp.response
    }

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
        setShowLoading(false)
        //onLogin(githubProvider)
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
