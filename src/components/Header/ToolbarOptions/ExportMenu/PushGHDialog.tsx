import { Box, Dialog, DialogContent, styled } from '@mui/material'
import { useState } from 'react'
import { useAppSelector } from '../../../../store/hooks'
import { PushGHDialogLogin } from './PushGHDialogLogin'
import { PushRepoLinkInput } from './PushRepoLinkInput'

interface Props {
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const StyledDialogContent = styled(DialogContent)({
    alignItems: 'center',
})
const StyledDialogTitle = styled('h1')({
    marginLeft: 10,
})

const StyledTopPortionContainer = styled(Box)({
    marginTop: -1,
    minHeight: 130,
})

const StyledCompletedResultContainer = styled(Box)({
    marginLeft: 1.5,
    marginTop: 2,
})

const StyledInstructionsContainer = styled(Box)({
    marginLeft: '25%',
    fontSize: 12,
    marginTop: -1.5,
})

const StyledInstructionsTitle = styled('h3')({
    marginLeft: '20%',
})

export const PushGHDialog = ({ setShowDialog }: Props) => {
    const loggedIn = useAppSelector((state) => state.auth).loggedIn
    const [showFinished, setShowFinished] = useState<boolean>(false)
    const [PRLink, setPRLink] = useState<string>('')

    return (
        <Dialog open={true} onClose={() => setShowDialog(false)} fullWidth>
            <StyledDialogContent>
                <StyledDialogTitle>Push to GitHub</StyledDialogTitle>
                <StyledTopPortionContainer>
                    {loggedIn ? (
                        <PushRepoLinkInput
                            setShowFinished={setShowFinished}
                            setPRLink={setPRLink}
                        />
                    ) : (
                        <PushGHDialogLogin />
                    )}

                    {showFinished && (
                        <StyledCompletedResultContainer>
                            Pull Request created!
                            <Box>
                                View it{' '}
                                <a href={PRLink} target='_blank'>
                                    here
                                </a>
                            </Box>
                        </StyledCompletedResultContainer>
                    )}
                </StyledTopPortionContainer>

                {/* <Button>Delete Branch</Button> */}

                <StyledInstructionsContainer>
                    <StyledInstructionsTitle>How it's done</StyledInstructionsTitle>
                    <p>1. A branch is created on your repository</p>
                    <p>2. A pull request of your exported README is created</p>
                    <p>3. You can review the pull request and merge it if you're satisfied</p>
                </StyledInstructionsContainer>
            </StyledDialogContent>
        </Dialog>
    )
}
