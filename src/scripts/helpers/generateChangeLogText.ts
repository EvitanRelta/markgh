import { repoName, repoOwner } from './config.json'
import type { PullRequestData } from './getGithubData'
import type { ClosedIssueData, ScrappedCommitDataWUserName, TagChanges } from './getTagChanges'

const hasLabel = (labelName: string) => (issueData: ClosedIssueData) =>
    issueData.issue.labels.some((label) => {
        if (typeof label === 'string') return label === labelName
        return label.name === labelName
    })

const getClosedByPRStr = (pullRequests: PullRequestData[]) =>
    pullRequests.map((pr) => `#${pr.number} by @${pr.user!.login}`).join(', ')
const getClosedByCommitStr = (commits: ScrappedCommitDataWUserName[]) =>
    commits.map((commit) => `${commit.commitHash} by @${commit.authorUserName}`).join(', ')
const toListItems = ({ issue, closedBy: { commits, pullRequests } }: ClosedIssueData) => {
    const closedByPrStr = getClosedByPRStr(pullRequests)
    const closedByCommitStr = getClosedByCommitStr(commits)
    return (
        `- [${issue.title.trim()}](${issue.html_url}) _(at ` +
        closedByPrStr +
        (closedByPrStr && closedByCommitStr ? ', ' : '') +
        closedByCommitStr +
        ')_'
    )
}
const getSection = (sectionTitle: string, data: ClosedIssueData[]) =>
    data.length === 0 ? '' : `### ${sectionTitle}\n` + data.map(toListItems).join('\n') + '\n\n'

const prToListItem = (pr: PullRequestData) =>
    `- [#${pr.number} – ${pr.title}](${pr.html_url}) _(by @${pr.user!.login})_`
const getPullRequestSection = (pull_requests: PullRequestData[]) =>
    pull_requests.length === 0
        ? ''
        : `## Merged Pull Requests\n` + pull_requests.map(prToListItem).join('\n') + '\n\n'

export const generateChangeLogText = (tagChanges: TagChanges): string => {
    const closedIssues = tagChanges.closedIssues
    const features = closedIssues.filter(hasLabel('feature'))
    const improvements = closedIssues.filter(hasLabel('improvement'))
    const bugs = closedIssues.filter(hasLabel('bug'))
    const refactorings = closedIssues.filter(hasLabel('refactor'))

    const featuresSection = getSection('New Features', features)
    const improvementsSection = getSection('Improvements', improvements)
    const bugsFixesSection = getSection('Bug Fixes', bugs)
    const refactoringsSection = getSection('Refactorings', refactorings)
    const pullRequestSection = getPullRequestSection(tagChanges.mergedPullRequests)

    const body =
        featuresSection +
        improvementsSection +
        bugsFixesSection +
        refactoringsSection +
        pullRequestSection

    return (
        "## What's Changed\n\n" +
        body +
        `<br>\n\n**Full Changelog**: https://github.com/${repoOwner}/${repoName}/compare/${tagChanges.previousTag}...${tagChanges.tag}`
    )
}
