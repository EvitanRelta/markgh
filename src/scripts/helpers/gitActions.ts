import FS from '@isomorphic-git/lightning-fs'
import { Octokit } from '@octokit/rest'
import git from 'isomorphic-git'
import http from 'isomorphic-git/http/web'
import { getUserRepoPairFromUrl } from './getUserRepoPairFromUrl'

const dir = '/'
const corsProxy = 'https://cors-header-writer.herokuapp.com/'

interface PullRequest {
    title: string
    body: string
    number: number
}

export const gitPR = async (fs: FS, url: string, token: string) => {
    const octokit = new Octokit({ auth: token })
    const PRID = Math.floor(Math.random() * (10000 + 1))

    const [owner, repo] = getUserRepoPairFromUrl(url)

    const gitClone = async () => {
        const res = await git
            .clone({
                fs,
                http,
                dir,
                corsProxy,
                url: url,
                singleBranch: true,
                depth: 1,
                onAuth: () => ({
                    username: token,
                    password: 'x-oauth-basic',
                }),
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //gets default branch of repo
    const getDefaultBranch = async () => {
        const res = await octokit.rest.repos.get({
            owner,
            repo,
        })
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

    const gitPush = async () => {
        const res = await git
            .push({
                fs,
                http,
                dir,
                corsProxy,
                remote: 'origin',
                ref: 'markgh-readme',
                onAuth: () => ({
                    username: token,
                    password: 'x-oauth-basic',
                }),
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const createPullRequest = async () => {
        console.log('createpr')
        const head = 'markgh-readme'
        const base = await defaultBranch
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

    // gitClone()
    // createBranch()
    // gitPush()
    // createPullRequest()
}
