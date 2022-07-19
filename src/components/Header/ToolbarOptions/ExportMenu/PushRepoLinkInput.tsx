import { Box, Button, CircularProgress, styled, TextField } from '@mui/material'
import { encode } from 'base-64'
import { useState } from 'react'
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from '../../../../converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from '../../../../converterFunctions/helpers/removeTipTapArtifacts'
import { isGithubRepoUrl } from '../../../../scripts/helpers/InputLinkHelpers/linkValidity'
import { updateGitHubReadme } from '../../../../scripts/helpers/updateGitHubReadme'
import { useAppSelector } from '../../../../store/hooks'

interface Props {
    setShowFinished: React.Dispatch<React.SetStateAction<boolean>>
    setPRLink: React.Dispatch<React.SetStateAction<string>>
}

const StyledTitle = styled('h5')({
    marginLeft: 10,
})

const StyledMidSectionContainer = styled(Box)({
    justifyContent: 'space-between',
    display: 'flex',
    marginTop: -2,
    maxWidth: '95%',
})

const StyledInputField = styled(TextField)({
    width: 450,
})

const StyledLoadingCircleContainer = styled(Box)({
    marginTop: 5,
    marginRight: 25,
})

const StyledPushButton = styled(Button)({
    maxHeight: 40,
    marginRight: 2,
})

export const PushRepoLinkInput = ({ setShowFinished, setPRLink }: Props) => {
    const editor = useAppSelector((state) => state.data.editor)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [showError, setShowError] = useState<boolean>(false)
    const [link, setLink] = useState<string>('')

    const [showLoading, setShowLoading] = useState<boolean>(false)

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

        if (!isGithubRepoUrl(link)) {
            setShowError(true)
            setErrorMessage('Invalid Repository URL')
            setShowLoading(false)
            return
        }
        await updateGitHubReadme(
            link,
            localStorage['ghToken'],
            prepareFileContent(editor.view.dom.cloneNode(true) as HTMLElement)
        )
            .then((PRLink) => {
                setShowError(false)
                setErrorMessage('')
                setShowLoading(false)
                setShowFinished(true)
                setPRLink(PRLink)
            })
            .catch((e) => {
                setShowError(true)
                setShowLoading(false)
                setErrorMessage(e.message)
            })
    }

    return (
        <>
            <StyledTitle>Insert Respository Link</StyledTitle>
            <StyledMidSectionContainer>
                <StyledInputField
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
                        showError ? errorMessage : 'Please make sure you are logged in to push'
                    }
                />

                {showLoading ? (
                    <StyledLoadingCircleContainer>
                        <CircularProgress size={25} />
                    </StyledLoadingCircleContainer>
                ) : (
                    <StyledPushButton onClick={() => handlePushButtonClick()}>
                        Push
                    </StyledPushButton>
                )}
            </StyledMidSectionContainer>
        </>
    )
}
