import { Box, Button, CircularProgress, Dialog, DialogContent, TextField } from '@mui/material'
import { encode } from 'base-64'
import { useState } from 'react'
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from '../../../../converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from '../../../../converterFunctions/helpers/removeTipTapArtifacts'
import { updateGitHubReadme } from '../../../../scripts/helpers/updateGitHubReadme'
import { useAppSelector } from '../../../../store/hooks'

interface Props {
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export const PushGHDialog = ({ setShowDialog }: Props) => {
    const editor = useAppSelector((state) => state.data.editor)
    const [link, setLink] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [showLoading, setShowLoading] = useState<boolean>(false)
    const [showError, setShowError] = useState<boolean>(false)
    const [showFinished, setShowFinished] = useState<boolean>(false)
    const [PRLink, setPRLink] = useState<string>('')

    //github api stores file contents in base64
    const prepareFileContent = (content: HTMLElement) => {
        removeCodeBlockWrapper(content)
        removeImageWrapper(content)
        removeTipTapArtifacts(content)
        return encode(content.innerHTML) //encodes in base64
    }

    const handlePushButtonClick = async () => {
        setShowFinished(false)
        setShowLoading(true)
        const PRLink = await updateGitHubReadme(
            link,
            localStorage['ghToken'],
            prepareFileContent(editor.view.dom.cloneNode(true) as HTMLElement),
            setShowLoading,
            setShowFinished
        )
        setPRLink(PRLink)
    }

    return (
        <Dialog open={true} onClose={() => setShowDialog(false)} fullWidth>
            <DialogContent sx={{ alignItems: 'center' }}>
                <h1 style={{ marginLeft: 10 }}>Push to GitHub</h1>
                <Box sx={{ minHeight: 130, marginTop: -1 }}>
                    <h5 style={{ marginLeft: 10 }}>Insert Respository Link</h5>
                    <Box sx={{ justifyContent: 'space-between', display: 'flex', marginTop: -2 }}>
                        <TextField
                            sx={{ width: 450 }}
                            error={showError}
                            type='text'
                            size='small'
                            placeholder={'https://github.com/user/project'}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => {
                                setLink(e.target.value)
                                setShowError(false)
                                setShowLoading(false)
                            }}
                            onKeyPress={(ev) => {
                                if (ev.key === 'Enter') {
                                    ev.preventDefault()
                                    handlePushButtonClick()
                                }
                            }}
                            helperText={
                                showError
                                    ? errorMessage
                                    : 'Please make sure you are logged in to push'
                            }
                        />

                        {showLoading ? (
                            <Box sx={{ marginTop: 0.8, marginRight: 6 }}>
                                <CircularProgress size={25} />
                            </Box>
                        ) : (
                            <Button
                                sx={{ maxHeight: 40, marginRight: 2 }}
                                onClick={() => handlePushButtonClick()}
                            >
                                Push
                            </Button>
                        )}
                    </Box>
                    {showFinished && (
                        <Box>
                            Pull Request created!
                            <Box>
                                View it{' '}
                                <a href={PRLink} target='_blank'>
                                    here
                                </a>
                            </Box>
                        </Box>
                    )}
                </Box>

                {/* <Button>Delete Branch</Button> */}

                <Box sx={{ marginLeft: '20%', fontSize: 12, marginTop: -1.5 }}>
                    <h3 style={{ marginLeft: '20%' }}>How it's done</h3>
                    <p>1. A branch is created on your repository</p>
                    <p>2. A pull request of your exported README is created</p>
                    <p>3. You can review the pull request and merge it if you're satisfied</p>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
