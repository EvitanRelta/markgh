import FS from '@isomorphic-git/lightning-fs'
import { Octokit } from '@octokit/rest'
import git from 'isomorphic-git'
import http from 'isomorphic-git/http/web'
import { getUserRepoPairFromUrl } from './getUserRepoPairFromUrl'

const dir = '/'

export const gitPR = (fs: FS, url: string, token: string) => {
    const octokit = new Octokit({ auth: token })

    const [owner, repo] = getUserRepoPairFromUrl(url)

    //gets default branch of repo
    const getDefaultBranch = async () => {
        const res = await octokit.rest.repos.get({
            owner,
            repo,
        })
        console.log(res.data)
        return res.data.default_branch
    }

    const defaultBranch = getDefaultBranch()

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
        const base = await defaultBranch
        octokit.rest.pulls.create({
            owner,
            repo,
            head,
            base,
        })
    }

    const gitClone = () => {
        const octokit = new Octokit({ auth: token })
        console.log('run')
        git.clone({
            fs,
            http,
            dir,
            corsProxy: 'https://cors.isomorphic-git.org/',
            url: url,
            singleBranch: true,
            depth: 1,
            onAuth: () => ({
                username: token,
                password: 'x-oauth-basic',
            }),
        }).catch((err) => {
            console.log(err)
        })
    }
}
