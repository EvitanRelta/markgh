import { Box, Button, CircularProgress, Dialog, DialogContent, TextField } from '@mui/material'
import { useState } from 'react'
import { updateGitHubReadme } from '../../../../scripts/helpers/updateGitHubReadme'

interface Props {
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export const PushGHDialog = ({ setShowDialog }: Props) => {
    const [link, setLink] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [showLoading, setShowLoading] = useState<boolean>(false)
    const [showError, setShowError] = useState<boolean>(false)
    const [showFinished, setShowFinished] = useState<boolean>(false)

    const getRepo = async () => {}

    return (
        <Dialog open={true} onClose={() => setShowDialog(false)} fullWidth>
            <DialogContent sx={{ alignItems: 'center' }}>
                <Box sx={{ marginLeft: 10 }}>
                    <h1>Push to GitHub</h1>
                    <Box sx={{ minHeight: 130 }}>
                        <h5 style={{ marginTop: 10, marginLeft: 10 }}>Insert Respository Link</h5>
                        <Box sx={{ justifyContent: 'space-between', display: 'flex', width: 350 }}>
                            <TextField
                                error={showError}
                                type='text'
                                size='small'
                                label={'Repository Link'}
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
                                        getRepo()
                                    }
                                }}
                                helperText={
                                    showError
                                        ? errorMessage
                                        : 'Please login if you are accessing a private repo'
                                }
                            />

                            {showLoading ? (
                                <Box sx={{ marginTop: 0.8, marginRight: -1 }}>
                                    <CircularProgress size={25} />
                                </Box>
                            ) : (
                                <Button
                                    sx={{ marginRight: -3, maxHeight: 40 }}
                                    onClick={() => {
                                        setShowLoading(true)
                                        updateGitHubReadme(
                                            link,
                                            localStorage['ghToken'],
                                            setShowLoading
                                        )
                                    }}
                                >
                                    Push
                                </Button>
                            )}
                        </Box>
                        {showFinished && <p>Pull Request created. View it here</p>}
                    </Box>

                    {/* <Button>Delete Branch</Button> */}

                    <Box sx={{ marginRight: 10, fontSize: 12, marginTop: -1.5 }}>
                        <h3 style={{ marginLeft: 10 }}>How it's done</h3>
                        <p>1. A branch is created on your repository</p>
                        <p>2. A pull request of your exported README is created</p>
                        <p>3. You can review the pull request and merge it if you're satisfied</p>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
