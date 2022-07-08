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
        `- [${issue.title.trim()}](${issue.html_url}) at ` +
        closedByPrStr +
        (closedByPrStr && closedByCommitStr ? ', ' : '') +
        closedByCommitStr
    )
}
const getSection = (sectionTitle: string, data: ClosedIssueData[]) =>
    data.length === 0 ? '' : `### ${sectionTitle}\n` + data.map(toListItems).join('\n') + '\n\n'

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

    const body = featuresSection + improvementsSection + bugsFixesSection + refactoringsSection

    return (
        "## What's Changed\n\n" +
        body +
        `**Full Changelog**: https://github.com/${repoOwner}/${repoName}/compare/${tagChanges.previousTag}...${tagChanges.tag}`
    )
}

/*
## What's Changed
* Site UI elements by @swxk19 in https://github.com/EvitanRelta/markgh/pull/1
* Change markdown button to fixed position by @swxk19 in https://github.com/EvitanRelta/markgh/pull/2
* Convert most files to TypeScript by @swxk19 in https://github.com/EvitanRelta/markgh/pull/12
* Storage features by @swxk19 in https://github.com/EvitanRelta/markgh/pull/24
* Toolbar for File Options by @swxk19 in https://github.com/EvitanRelta/markgh/pull/25
* Organise and clean repo by @swxk19 in https://github.com/EvitanRelta/markgh/pull/26
* Add feature to copy markdown to clipboard by @swxk19 in https://github.com/EvitanRelta/markgh/pull/27
* Polish UI for EditorToolbar by @swxk19 in https://github.com/EvitanRelta/markgh/pull/31
* (WIP) Add git-clone feature  by @swxk19 in https://github.com/EvitanRelta/markgh/pull/40
* Add support for cloning private repos by @swxk19 in https://github.com/EvitanRelta/markgh/pull/55
* Add feature to allow for editor text to persist by @swxk19 in https://github.com/EvitanRelta/markgh/pull/59
* Fix persistent text warnings  by @swxk19 in https://github.com/EvitanRelta/markgh/pull/60
* Refactor elements to use MUI by @swxk19 in https://github.com/EvitanRelta/markgh/pull/62
* Add support for SEO in Google search by @swxk19 in https://github.com/EvitanRelta/markgh/pull/64
* Polishes for UI (Issue #46) by @swxk19 in https://github.com/EvitanRelta/markgh/pull/68
* Change method of importing READMEs from repos by @swxk19 in https://github.com/EvitanRelta/markgh/pull/72
* Change site logo & title by @swxk19 in https://github.com/EvitanRelta/markgh/pull/78
* Resize 'OK' button  by @swxk19 in https://github.com/EvitanRelta/markgh/pull/79


**Full Changelog**: https://github.com/EvitanRelta/markgh/commits/v0.2.0
*/
