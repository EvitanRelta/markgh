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
    minHeight: 170,
})

const StyledCompletedResultContainer = styled(Box)({
    marginTop: 12,
    marginLeft: 30,
})

const StyledInstructionsContainer = styled(Box)({
    fontSize: 12,
    marginTop: -16,
    marginLeft: '5%',
    lineHeight: 0.8,
})

const StyledInstructionsTitle = styled('h3')({})

export const PushGHDialog = ({ setShowDialog }: Props) => {
    const loggedIn = useAppSelector((state) => state.auth).loggedIn
    const [showFinished, setShowFinished] = useState<boolean>(false)
    const [PRLink, setPRLink] = useState<string>('')

    return (
        <Dialog open={true} onClose={() => setShowDialog(false)} fullWidth>
            <StyledDialogContent>
                <StyledDialogTitle>Push to GitHub</StyledDialogTitle>
                <StyledInstructionsContainer>
                    <StyledInstructionsTitle>What it will do:</StyledInstructionsTitle>
                    <p>1. Push changes to 'markgh-readme' branch </p>
                    <p>2. Creates a pull-request </p>

                    <StyledInstructionsTitle>Then you can:</StyledInstructionsTitle>
                    <p>1. Review the pull-request on GitHub </p>
                    <p>2. Merge if you're satisified</p>
                </StyledInstructionsContainer>
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
            </StyledDialogContent>
        </Dialog>
    )
}
