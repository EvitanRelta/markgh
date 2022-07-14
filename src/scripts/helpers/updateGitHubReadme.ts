import { Octokit } from '@octokit/rest'
import { getUserRepoPairFromUrl } from './InputLinkHelpers/getUserRepoPairFromUrl'

interface PullRequest {
    title: string
    body: string
    number: number
}

export const updateGitHubReadme = async (
    url: string,
    token: string,
    setShowLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setShowFinished: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const octokit = new Octokit({ auth: token })
    const PRID = Math.floor(Math.random() * (10000 + 1))

    const [owner, repo] = getUserRepoPairFromUrl(url)

    //gets default branch of repo
    const getDefaultBranch = async () => {
        const res = await octokit.rest.repos.get({
            owner,
            repo,
        })
        return res.data.default_branch
    }

    const defaultBranch = await getDefaultBranch()

    //gets latest commit hash of default branch
    const getDefaultBranchCommitHash = async () => {
        const branch = defaultBranch
        const res = await octokit.rest.repos.getBranch({
            owner,
            repo,
            branch,
        })
        return res.data.commit.sha
    }

    const defaultBranchCommitHash = await getDefaultBranchCommitHash()

    //create branch named 'markgh-readme'
    const createBranch = async () => {
        console.log('create branch')
        const ref = `refs/heads/markgh-readme`

        //new branch will be created from this commit
        const sha = defaultBranchCommitHash

        const res = await octokit.rest.git.createRef({
            owner,
            repo,
            ref,
            sha,
        })
        return res
    }

    //create pull request with branch 'markgh-readme' onto user's default branch
    const createPullRequest = async () => {
        console.log('create pull request')
        const head = 'markgh-readme'
        const base = defaultBranch
        const title = 'README created with MarkGH'
        const body = 'readme-id: ' + PRID
        const res = await octokit.rest.pulls.create({
            owner,
            repo,
            head,
            base,
            title,
            body,
        })
        return res
    }

    const getTargetFileHash = async () => {
        const targetFile = 'README.md'
        const path = ''
        const res = await octokit.rest.repos.getContent({
            owner,
            repo,
            path,
        })

        const fileArray = res.data as Array<any>
        for (let i = 0; i < fileArray.length; i++) {
            let file = fileArray[i]
            if (file.name === targetFile) {
                return file.sha
            }
        }

        return 'ERROR'
    }

    const targetFileHash = await getTargetFileHash()

    const updateReadMeToBranch = async () => {
        console.log('push readme')
        const path = 'README.md'
        const message = 'Update README by MarkGH'
        const content = ''

        const res = await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path,
            message,
            content,
            branch: 'markgh-readme',
            sha: targetFileHash,
        })

        return res
    }

    //gets url for the created PR, for user to click and view
    const getPRLink = async (url: string) => {
        console.log('get pr link')
        const res = await octokit.rest.pulls.list({
            owner,
            repo,
        })
        const PRArray = res.data as PullRequest[]

        for (let i = 0; i < PRArray.length; i++) {
            const PR: PullRequest = PRArray[i]
            if (PR.title === 'README created with MarkGH' && PR.body === 'readme-id: ' + PRID) {
                const issueId = PR.number
                return `https://github.com/${owner}/${repo}/pull/${issueId}`
            }
        }
        return 'ERROR1'
    }

    //returns link to PR for user to click and view
    return await createBranch()
        .then((res) => updateReadMeToBranch())
        .then((res) => createPullRequest())
        .then((res) => {
            setShowLoading(false)
            setShowFinished(true)
            return getPRLink(url)
        })
        .catch((e) => {
            setShowLoading(false)
            console.log(e)
            return 'ERROR'
        })
}
