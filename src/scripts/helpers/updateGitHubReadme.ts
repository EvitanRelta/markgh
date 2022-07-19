import { Octokit } from '@octokit/rest'
import { getUserRepoPairFromUrl } from './InputLinkHelpers/getUserRepoPairFromUrl'

interface PullRequest {
    head: {
        ref: string
    }
    number: number
    state: string
}

export class RetrievePRError extends Error {
    constructor() {
        super('Unable to retrieve PR (GitHub may be down)')
    }
}

export class NonExistentRepoError extends Error {
    constructor() {
        super('Repository does not exist, please check the link')
    }
}

export const updateGitHubReadme = async (url: string, token: string, base64Content: string) => {
    const octokit = new Octokit({ auth: token })

    //branch to get readme from, will be set by running of 'getBranchCommitHash'
    var branch = ''

    const [owner, repo] = getUserRepoPairFromUrl(url)

    //gets default branch of repo
    //checks if repo exists
    const getDefaultBranch = async () => {
        try {
            const res = await octokit.rest.repos.get({
                owner,
                repo,
            })
            return res.data.default_branch
        } catch (e) {
            throw new NonExistentRepoError()
        }
    }

    //gets latest commit hash of markgh-branch (if already created) or default branch
    const getBranchCommitHash = async () => {
        try {
            branch = 'markgh-readme'
            const res = await octokit.rest.repos.getBranch({
                owner,
                repo,
                branch,
            })
            return res.data.commit.sha
        } catch (e: any) {
            switch (e.status) {
                //markgh-readme branch has not been created, get default branch's (master) hash
                case 404:
                    branch = await getDefaultBranch()
                    const res = await octokit.rest.repos.getBranch({
                        owner,
                        repo,
                        branch,
                    })
                    return res.data.commit.sha
                default:
                    throw e
            }
        }
    }

    //create branch named 'markgh-readme'
    const createBranch = async () => {
        const ref = `refs/heads/markgh-readme`

        //new branch will be created from this commit (if markgh-readme branch not yet created)
        try {
            const sha = await getBranchCommitHash()

            await octokit.rest.git.createRef({
                owner,
                repo,
                ref,
                sha,
            })
        } catch (e: any) {
            switch (e.status) {
                //branch already exists,
                // change head branch(where the target readme file to update is located) to markgh-readme
                case 422:
                    branch = 'markgh-readme'
                    break
                default:
                    throw e
            }
        }
    }

    //create pull request with branch 'markgh-readme' onto user's default branch
    const createPullRequest = async () => {
        //Currently no open PRs with 'markgh-readme' branch, create one
        try {
            const head = 'markgh-readme'
            const base = await getDefaultBranch()
            const title = 'README created with MarkGH'
            const body = "Review the changes and merge it when you're ready 😊"
            const res = await octokit.rest.pulls.create({
                owner,
                repo,
                head,
                base,
                title,
                body,
            })
        } catch (e: any) {
            switch (e.status) {
                //An open PR from 'markgh-readme' still currently exists, do nothing
                //GitHub automatically updates new commits of the same branch to the PR
                case 422:
                    break
                default:
                    throw e
            }
        }
    }

    //gets the hash of the file to update
    //gets from 'master' branch if it is the first push
    //gets from 'markgh-readme' branch if it already exists
    const getTargetFileHash = async () => {
        try {
            const targetFile = 'README.md'
            const path = ''
            const ref = branch //determind by whether a 'markgh-readme' branch was already created prior to this push
            const res = await octokit.rest.repos.getReadme({
                owner,
                repo,
                path,
                ref,
            })

            return res.data.sha
        } catch (e) {
            throw e
        }
    }

    //push new readme to (newly) created 'markgh-readme' branch
    const updateReadMeToBranch = async () => {
        const path = 'README.md'
        const message = 'Update README by MarkGH'
        const content = base64Content

        const res = await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path,
            message,
            content,
            branch: 'markgh-readme',
            sha: await getTargetFileHash(),
        })

        return res
    }

    //gets url for the created PR, for user to click and view
    const getPRLink = async (url: string) => {
        const res = await octokit.rest.pulls.list({
            owner,
            repo,
        })

        const PRArray = res.data as PullRequest[]

        for (let i = 0; i < PRArray.length; i++) {
            const PR: PullRequest = PRArray[i]
            //Find an open PR from 'markgh-readme' branch
            if (PR.head.ref === 'markgh-readme' && PR.state === 'open') {
                const issueId = PR.number
                return `https://github.com/${owner}/${repo}/pull/${issueId}`
            }
        }
        throw new RetrievePRError()
    }

    //returns link to PR for user to click and view
    return await createBranch()
        .then((res) => updateReadMeToBranch())
        .then((res) => createPullRequest())
        .then((res) => {
            return getPRLink(url)
        })
        .catch((e) => {
            throw e
        })
}
