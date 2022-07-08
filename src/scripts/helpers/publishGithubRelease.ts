import { repoName, repoOwner } from './config.json'
import { octokit } from './initOctokit'

export const publishGithubRelease = (tag: string, body: string) => {
    return octokit.rest.repos.createRelease({
        owner: repoOwner,
        repo: repoName,
        tag_name: tag,
        body,
    })
}
