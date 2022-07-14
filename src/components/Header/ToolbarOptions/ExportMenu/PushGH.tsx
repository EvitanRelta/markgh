import { Box, Button, Dialog, DialogContent, MenuItem, TextField } from '@mui/material'
import { useState } from 'react'
import { updateGitHubReadme } from '../../../../scripts/helpers/updateGitHubReadme'

export const PushGH = () => {
    const [showDialog, setShowDialog] = useState(false)
    const [link, setLink] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [showError, setShowError] = useState<boolean>(false)
    const [showLoading, setShowLoading] = useState<boolean>(false)

    const getRepo = async () => {}

    const pushInputDialog = (
        <Dialog open={showDialog} onClose={() => setShowDialog(false)} fullWidth>
            <DialogContent sx={{ height: 500, alignItems: 'center' }}>
                <Box sx={{ marginLeft: 10 }}>
                    <h1>Push to GitHub</h1>

                    <h5>Insert Respository Link</h5>

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

                    <Button
                        sx={{ display: 'block' }}
                        onClick={() =>
                            updateGitHubReadme(
                                'https://github.com/swxk19/private-repo',
                                localStorage['ghToken']
                            )
                        }
                    >
                        Push
                    </Button>

                    <p>Pull Request created. View it here</p>

                    <Button>Delete Branch</Button>

                    <Box sx={{ marginRight: 10, fontSize: 12, marginTop: -1.5 }}>
                        <h3>How it's done</h3>
                        <p>1. A branch is created on your repository</p>
                        <p>2. A pull request of your exported README is created</p>
                        <p>3. You can review the pull request and merge it if you're satisfied</p>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )

    return (
        <>
            <MenuItem onClick={() => setShowDialog(true)}>Push README to Repo</MenuItem>
            {pushInputDialog}
        </>
    )
}
