import { Box, Dialog, DialogContent } from '@mui/material'
import { useState } from 'react'
import { useAppSelector } from '../../../../store/hooks'
import { PushGHDialogLogin } from './PushGHDialogLogin'
import { PushRepoLinkInput } from './PushRepoLinkInput'

interface Props {
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export const PushGHDialog = ({ setShowDialog }: Props) => {
    const loggedIn = useAppSelector((state) => state.auth).loggedIn
    const [showFinished, setShowFinished] = useState<boolean>(false)
    const [PRLink, setPRLink] = useState<string>('')

    return (
        <Dialog open={true} onClose={() => setShowDialog(false)} fullWidth>
            <DialogContent sx={{ alignItems: 'center' }}>
                <h1 style={{ marginLeft: 10 }}>Push to GitHub</h1>
                <Box sx={{ marginTop: -1, minHeight: 130 }}>
                    {loggedIn ? (
                        <PushRepoLinkInput
                            setShowFinished={setShowFinished}
                            setPRLink={setPRLink}
                        />
                    ) : (
                        <PushGHDialogLogin />
                    )}
                </Box>

                {showFinished && (
                    <>
                        Pull Request created!
                        <Box>
                            View it{' '}
                            <a href={PRLink} target='_blank'>
                                here
                            </a>
                        </Box>
                    </>
                )}

                {/* <Button>Delete Branch</Button> */}

                <Box sx={{ marginLeft: '25%', fontSize: 12, marginTop: -1.5 }}>
                    <h3 style={{ marginLeft: '20%' }}>How it's done</h3>
                    <p>1. A branch is created on your repository</p>
                    <p>2. A pull request of your exported README is created</p>
                    <p>3. You can review the pull request and merge it if you're satisfied</p>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
