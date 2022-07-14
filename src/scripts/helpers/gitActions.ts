import { Octokit } from '@octokit/rest'
import { getUserRepoPairFromUrl } from './getUserRepoPairFromUrl'

const dir = '/'
const corsProxy = 'https://cors-header-writer.herokuapp.com/'

interface PullRequest {
    title: string
    body: string
    number: number
}

export const gitPR = async (url: string, token: string) => {
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
    const getDefaultCommitHash = async () => {
        const branch = await defaultBranch
        const res = await octokit.rest.repos.getBranch({
            owner,
            repo,
            branch,
        })
        return res.data.commit.sha
    }
    const defaultCommitHash = await getDefaultCommitHash()
    //create branch named 'markgh-readme'
    const createBranch = async () => {
        console.log('create branch')
        const ref = `refs/heads/markgh-readme`

        //new branch will be created from this commit
        const sha = await getDefaultCommitHash()

        octokit.rest.git.createRef({
            owner,
            repo,
            ref,
            sha,
        })
    }

    const createPullRequest = async () => {
        console.log('createpr')
        const head = 'markgh-readme'
        const base = defaultBranch
        const title = 'README created with MarkGH'
        const body = 'readme-id: ' + PRID
        octokit.rest.pulls.create({
            owner,
            repo,
            head,
            base,
            title,
            body,
        })
    }

    const getPRLink = async (url: string) => {
        const res = await octokit.rest.pulls.list({
            owner,
            repo,
        })
        const PRArray = res.data as PullRequest[]

        for (let i = 0; i < PRArray.length; i++) {
            const PR: PullRequest = PRArray[i]
            // if (PR.title === 'README created with MarkGH' && PR.body === 'readme-id: ' + PRID) {
            if (PR.title === 'code refactoring') {
                const issueId = PR.number
                return `https://github.com/${owner}/${repo}/pull/${issueId}`
            }
        }
        return 'ERROR'
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
        console.log(res)
    }

    // gitClone()
    // createBranch()
    // gitPush()
    // createPullRequest()
    updateReadMeToBranch()
}
