import { Box, Dialog, DialogContent } from '@mui/material'
import { useState } from 'react'
import { PushRepoLinkInput } from './PushRepoLinkInput'

interface Props {
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export const PushGHDialog = ({ setShowDialog }: Props) => {
    const [showFinished, setShowFinished] = useState<boolean>(false)
    const [PRLink, setPRLink] = useState<string>('')

    return (
        <Dialog open={true} onClose={() => setShowDialog(false)} fullWidth>
            <DialogContent sx={{ alignItems: 'center' }}>
                <>
                    <h1 style={{ marginLeft: 10 }}>Push to GitHub</h1>
                    <PushRepoLinkInput setShowFinished={setShowFinished} setPRLink={setPRLink} />

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

                    <Box sx={{ marginLeft: '20%', fontSize: 12, marginTop: -1.5 }}>
                        <h3 style={{ marginLeft: '20%' }}>How it's done</h3>
                        <p>1. A branch is created on your repository</p>
                        <p>2. A pull request of your exported README is created</p>
                        <p>3. You can review the pull request and merge it if you're satisfied</p>
                    </Box>
                </>
            </DialogContent>
        </Dialog>
    )
}
