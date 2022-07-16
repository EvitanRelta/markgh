import { repoName, repoOwner } from '../config.json'
import type { ChangesData, ClosedIssueData, PullRequestData } from './types'

interface TagOptions {
    previousTag: string
    tag: string
}

export const generateChangeLogText = (changes: ChangesData, tagOptions?: TagOptions): string => {
    const closedIssues = changes.closedIssues.slice()
    const mergedPullRequests = changes.mergedPullRequests.slice()

    closedIssues.sort(sortIssuesByOldestClosedDates)
    mergedPullRequests.sort(sortPRsByOldestMergedDates)

    const features = closedIssues.filter(hasLabel('feature'))
    const improvements = closedIssues.filter(hasLabel('improvement'))
    const bugs = closedIssues.filter(hasLabel('bug'))
    const refactorings = closedIssues.filter(hasLabel('refactor'))

    const featuresSection = getIssueSection('New Features', features)
    const improvementsSection = getIssueSection('Improvements', improvements)
    const bugsFixesSection = getIssueSection('Bug Fixes', bugs)
    const refactoringsSection = getIssueSection('Refactorings', refactorings)

    const pullRequestSection = getPullRequestSection(mergedPullRequests)

    const body =
        featuresSection +
        improvementsSection +
        bugsFixesSection +
        refactoringsSection +
        pullRequestSection

    const fullChangeLog = tagOptions
        ? `<br>\n\n**Full Changelog**: https://github.com/${repoOwner}/${repoName}/compare/${tagOptions.previousTag}...${tagOptions.tag}`
        : ''

    return "## What's Changed\n\n" + body + fullChangeLog
}

const getDateDiff = (dateStr1: string, dateStr2: string) =>
    new Date(dateStr1).getTime() - new Date(dateStr2).getTime()

const sortIssuesByOldestClosedDates = (issueData1: ClosedIssueData, issueData2: ClosedIssueData) =>
    getDateDiff(issueData1.issue.closed_at!, issueData2.issue.closed_at!)
const sortPRsByOldestMergedDates = (pr1: PullRequestData, pr2: PullRequestData) =>
    getDateDiff(pr1.merged_at!, pr2.merged_at!)

const hasLabel = (labelName: string) => (issueData: ClosedIssueData) =>
    issueData.issue.labels.some((label) => {
        if (typeof label === 'string') return label === labelName
        return label.name === labelName
    })

const getIssueSection = (sectionTitle: string, data: ClosedIssueData[]) => {
    if (data.length === 0) return ''

    const toListItem = ({ issue, closedBy: { commits, pullRequests } }: ClosedIssueData) => {
        const closedByPrStr = pullRequests
            .map((pr) => `#${pr.number} by @${pr.user!.login}`)
            .join(', ')
        const closedByCommitStr = commits
            .map((commit) => `${commit.commitHash} by @${commit.authorUserName}`)
            .join(', ')
        return (
            `- [${issue.title.trim()}](${issue.html_url}) _(at ` +
            closedByPrStr +
            (closedByPrStr && closedByCommitStr ? ', ' : '') +
            closedByCommitStr +
            ')_'
        )
    }

    return `### ${sectionTitle}\n` + data.map(toListItem).join('\n') + '\n\n'
}

const getPullRequestSection = (pullRequests: PullRequestData[]) => {
    if (pullRequests.length === 0) return ''

    const toListItem = (pr: PullRequestData) =>
        `- [#${pr.number} – ${pr.title}](${pr.html_url}) _(by @${pr.user!.login})_`

    return `## Merged Pull Requests\n` + pullRequests.map(toListItem).join('\n') + '\n\n'
}
