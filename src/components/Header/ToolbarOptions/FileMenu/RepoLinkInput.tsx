import { Box, Button, CircularProgress, styled, TextField } from '@mui/material'
import staticAxios from 'axios'
import { useState } from 'react'
import { markdownToHtml } from '../../../../converterFunctions'
import { GithubRepoInfo } from '../../../../converterFunctions/markdownToHtml'
import { getFormatedNow } from '../../../../store/helpers/getFormatedNow'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { loadSnapshot } from '../../../../store/snapshotThunks'

interface Props {
    setAnchor: React.Dispatch<React.SetStateAction<(EventTarget & Element) | null>>
}
const StyledLinkInputContainer = styled(Box)({
    padding: 1,
    paddingLeft: 8,
    paddingTop: 15,
    justifyContent: 'space-between',
    display: 'flex',
})

const StyledTextField = styled(TextField)({
    minWidth: 300,
})

const StyledCircularProgressContainer = styled(Box)({
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
})
const StyledCircularProgress = styled(CircularProgress)({
    marginTop: 0.8,
})

const StyledOKButton = styled(Button)({
    marginTop: 0.2,
    marginLeft: 0.9,
})
export const RepoLinkInput = ({ setAnchor }: Props) => {
    const dispatch = useAppDispatch()
    const axios = useAppSelector((state) => state.auth.axios)
    const [link, setLink] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [showError, setShowError] = useState<boolean>(false)
    const [showLoading, setShowLoading] = useState<boolean>(false)

    const corsProxyPrefix = 'https://cors-header-writer.herokuapp.com/'

    const isGithubRepoUrl = (url: string) =>
        /(https?:\/\/)?(www\.)?github.com(\/[\w-]+){2}/i.test(url)
    const isRawGithubMarkdownUrl = (url: string) =>
        /(https?:\/\/)?raw\.githubusercontent.com(\/[\w-]+){4,}.md/i.test(url)
    const isValidLink = (url: string) => isGithubRepoUrl(url) || isRawGithubMarkdownUrl(url)

    const getDefaultBranch = async (user: string, repo: string) => {
        interface GetRepoResponseDataType {
            default_branch: string
        }

        const { default_branch } = (
            await axios.get<GetRepoResponseDataType>(`https://api.github.com/repos/${user}/${repo}`)
        ).data
        return default_branch
    }

    const parseImportUrl = async (url: string): Promise<GithubRepoInfo> => {
        if (isRawGithubMarkdownUrl(url)) {
            const rawGithubUrlPath = /raw\.githubusercontent.com((\/[\w-]+){4,}.md)/.exec(
                url
            )?.[1] as string
            const [user, repo, branch, dirPath, fileName] =
                /^\/([\w-]+)\/([\w-]+)\/([\w-]+)(.*\/)([\w-]+.md)$/
                    .exec(rawGithubUrlPath)
                    ?.slice(1) as [string, string, string, string, string]
            return { user, repo, branch, dirPath, fileName }
        }

        let dirPath = '/'
        let fileName = 'README.md'
        const [user, repo] = /github.com\/([\w-]+)\/([\w-]+)/i.exec(url)?.slice(1) as [
            string,
            string
        ]
        let branch = /github.com(\/([\w-]+)){4}/i.exec(url)?.[2]

        if (branch === undefined) branch = await getDefaultBranch(user, repo)
        else
            [dirPath, fileName] = /github.com(\/[\w-]+){2}\/blob\/[\w-]+(.*\/)([\w-]+.md)/i
                .exec(url)
                ?.slice(2) ?? [dirPath, fileName]

        return { user, repo, branch, dirPath, fileName }
    }

    const generateRawURL = (githubRepoInfo: GithubRepoInfo) => {
        const { user, repo, branch, dirPath, fileName } = githubRepoInfo
        return `${corsProxyPrefix}https://raw.githubusercontent.com/${user}/${repo}/${branch}${dirPath}${fileName}`
    }

    const getRepo = async () => {
        setShowLoading(true)

        if (!isValidLink(link)) {
            setShowError(true)
            setErrorMessage('Invalid Repository URL.')
            setShowLoading(false)
            return
        }

        try {
            type ResponseDataType = string
            const githubRepoInfo = await parseImportUrl(link)
            let response = await axios.get<ResponseDataType>(generateRawURL(githubRepoInfo))
            setAnchor(null)
            const htmlContent = markdownToHtml(response.data, githubRepoInfo)
            const { user, repo, branch, dirPath, fileName } = githubRepoInfo
            dispatch(
                loadSnapshot({
                    fileTitle: `(${user}/${repo}:${branch}) ${dirPath}${fileName}`,
                    lastEditedOn: getFormatedNow(),
                    content: htmlContent,
                })
            )
        } catch (e) {
            setShowError(true)
            if (!staticAxios.isAxiosError(e)) return setErrorMessage((e as Error).message)
            if (e.response?.status === 404)
                return setErrorMessage("Repo doesn't exist, or you don't have access to it.")
            return setErrorMessage(e.message)
        }
        setShowLoading(false)
    }

    return (
        <StyledLinkInputContainer>
            <Box>
                <StyledTextField
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
            </Box>
            <Box>
                {showLoading && !showError ? (
                    <StyledCircularProgressContainer>
                        <StyledCircularProgress size={25} />
                    </StyledCircularProgressContainer>
                ) : (
                    <StyledOKButton onClick={getRepo}>OK</StyledOKButton>
                )}
            </Box>
        </StyledLinkInputContainer>
    )
}
