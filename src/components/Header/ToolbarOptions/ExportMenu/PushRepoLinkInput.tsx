import { Box, Button, CircularProgress, TextField } from '@mui/material'
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
    setShowFinished: React.Dispatch<React.SetStateAction<boolean>>
    setPRLink: React.Dispatch<React.SetStateAction<string>>
}

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
        <>
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
                        showError ? errorMessage : 'Please make sure you are logged in to push'
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
        </>
    )
}
