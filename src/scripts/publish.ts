// Run via 'ts-node' npm package:
// npx ts-node PATH/publish.ts

// Attempt to init 'Octokit' Github API, as it might fail to get the
// stored token, or fail to authenticate.
import './helpers/initOctokit'

import { version } from '../../package.json'
import { askBooleanQuestion } from './helpers/askBooleanQuestion'
import { generateChangeLogText } from './helpers/changeLogHelpers/generateChangeLogText'
import { getChangesFromScrappedCommits } from './helpers/changeLogHelpers/getChangesFromScrappedCommits'
import { scrapeCommitData } from './helpers/changeLogHelpers/scrapeCommitData'
import { repoName, repoOwner } from './helpers/config.json'
import {
    branchExists,
    getCommitHashFromTag,
    getCurrentBranch,
    getLatestTag,
    getPreviousTag,
    getRemoteUrl,
    getTrackedBranch,
    hasUncommitedChanges,
    isUpToDate,
} from './helpers/gitHelpers'
import { sh } from './helpers/initShellJs'
import { publishGithubRelease } from './helpers/publishGithubRelease'
import { exitWithErrorMsg, getCommandOutput, logMsg } from './helpers/shellHelpers'
import { writeToFile } from './helpers/writeToFile'

const currentVersion = version
const githubRepo = `${repoOwner}/${repoName}`

interceptHelpFlag()

const selectedRemote = getSelectedRemote()
const selectedBranch = getSelectedBranch()
const bumpType = getBumpType()

;(async () => {
    validate()
    ensureBranchIsUpToDate()

    bumpVersion()
    pushSelectedBranch()
    forcePushToPublishedBranch()

    const latestTag = getLatestTag()
    const changeLog = await getChangeLogText(latestTag)

    // Saves it temporarily, incase it fails to publish.
    await writeToFile('./latestChangeLog.temp.md', changeLog)

    logMsg('Publishing Github release...')
    await publishGithubRelease(latestTag, latestTag, changeLog)

    logMsg('Done.')
})()

// ===== Functions =====
function interceptHelpFlag() {
    const hasHelpFlag = process.argv.includes('--help')
    if (!hasHelpFlag) return

    const helpMessage = `
Usage: npx ts-node PATH/publish.ts [patch|minor|major]
   or: npx ts-node PATH/publish.ts [patch|minor|major] [REMOTE]
   or: npx ts-node PATH/publish.ts [patch|minor|major] [REMOTE] [BRANCH]

(required 1st arg. is the version-bump type)
(optional 2nd arg. is the remote name to the GitHub repo: "${githubRepo}", default: "origin")
(optional 3rd arg. is the branch to publish", default: "master")
`.trim()
    sh.echo('-e', helpMessage)
    sh.exit(0)
}

function getBumpType() {
    const bumpType = process.argv[2]
    if (!bumpType)
        exitWithErrorMsg('Required 1st argument (ie. version-bump type) is not specified.')

    const validBumpTypes = ['patch', 'minor', 'major']
    const isValidBumpTypes = validBumpTypes.includes(bumpType)
    if (!isValidBumpTypes)
        exitWithErrorMsg(
            `Invalid 1st argument (ie. version-bump type). Valid types: ${validBumpTypes.join(
                ', '
            )}`
        )
    logMsg(`Selected bump type: "${bumpType}"`)
    return bumpType
}

function getSelectedRemote() {
    const remoteName = process.argv[3] || 'origin'
    logMsg(`Selected remote: "${remoteName}"`)
    return remoteName
}

function getSelectedBranch() {
    const branchName = process.argv[4] || 'master'
    logMsg(`Selected branch: "${branchName}"`)
    return branchName
}

function validate() {
    const requiredCommands = ['git', 'npm']
    const hasRequiredCommands = requiredCommands.every((command) => sh.which(command))
    if (!hasRequiredCommands)
        exitWithErrorMsg(
            `Missing requirements. \nThis script requires ${requiredCommands.join(', ')}.`
        )

    if (hasUncommitedChanges()) exitWithErrorMsg('Git directory has uncommited changes.')

    const currentBranch = getCurrentBranch()
    const isOnCorrectBranch = currentBranch === selectedBranch
    if (!isOnCorrectBranch)
        exitWithErrorMsg(
            `Needs to be on "${selectedBranch}" branch. \nCurrently on "${currentBranch}".`
        )

    const remoteUrl = getRemoteUrl(selectedRemote)
    const isCorrectRemoteUrl = new RegExp(
        `^(https://github.com/|git@github.com:)${githubRepo}(.git)?$`
    ).test(remoteUrl)
    if (!isCorrectRemoteUrl)
        exitWithErrorMsg(
            `The selected remote: "${selectedRemote}", \n` +
                `has URL: "${remoteUrl}" \n` +
                `which doesn't match the GitHub repo: "${githubRepo}".`
        )
}

function ensureBranchIsUpToDate() {
    const currentBranch = getCurrentBranch()
    const trackedBranch = getTrackedBranch(currentBranch)
    const isNotTrackingBranch = trackedBranch === ''
    if (isNotTrackingBranch) {
        const toContinue = askBooleanQuestion(
            `Warning: Branch "${selectedBranch}" is not tracking any remote branch. Continue? (y/n): `
        )
        if (!toContinue) sh.exit(1)
        return
    }

    if (isUpToDate(currentBranch))
        return logMsg(`Branch "${selectedBranch}" is up-to-date with "${trackedBranch}".`)

    exitWithErrorMsg(`Branch "${selectedBranch}" is not up-to-date with "${trackedBranch}".`)
}

function bumpVersion() {
    logMsg('Bumping version...')
    const versionBumpMsg = `Bump version from v${currentVersion} -> v%s` // '%s' will be the package.json version
    const newVersion = getCommandOutput(`npm version ${bumpType} -m "${versionBumpMsg}"`)
    logMsg(`Version bumped to ${newVersion}.`)
}

function pushSelectedBranch() {
    logMsg(`Pushing "${selectedBranch}" branch to "${selectedRemote}"...`)
    sh.exec('git push')
}

// Push commits to 'published' branch, to be auto-deployed to Github Pages via
// the Github Action - 'Deploy to GitHub Pages'.
function forcePushToPublishedBranch() {
    logMsg('Updating local "published" branch...')
    if (!branchExists('published')) sh.exec('git checkout -b published')
    else {
        sh.exec('git checkout published')
        sh.exec(`git reset --hard ${selectedBranch}`)
    }

    logMsg(`Force pushing "published" branch to "${selectedRemote}"...`)
    sh.exec(`git push -uf ${selectedRemote} published`)

    sh.exec('git checkout -') // return to previous checkout
}

async function getChangeLogText(tag: string) {
    logMsg('Generating changelog...')
    const previousTag = getPreviousTag(tag)

    logMsg('Scrapping local commits from Git log...')
    const scrappedCommits = scrapeCommitData(
        getCommitHashFromTag(previousTag),
        getCommitHashFromTag(tag),
        false,
        true
    )

    const tagChanges = await getChangesFromScrappedCommits(scrappedCommits)
    return generateChangeLogText(tagChanges, { tag, previousTag })
}
