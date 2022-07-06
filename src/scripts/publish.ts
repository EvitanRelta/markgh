// Run via 'ts-node' npm package:
// npx ts-node PATH/publish.ts

import sh from 'shelljs'
import { askBooleanQuestion } from './helpers/askBooleanQuestion'

const githubRepo = 'EvitanRelta/markgh'
sh.config.silent = true
sh.config.fatal = true

interceptHelpFlag()

const selectedRemote = getSelectedRemote()
const selectedBranch = getSelectedBranch()

validate()
ensureBranchIsUpToDate()

bumpVersion()
forcePushToPublishedBranch()

logMsg('Done.')

// ===== Functions =====
function interceptHelpFlag() {
    const hasHelpFlag = process.argv.includes('--help')
    if (!hasHelpFlag) return

    const helpMessage = `
Usage: npx ts-node PATH/publish.ts
   or: npx ts-node PATH/publish.ts [REMOTE]
   or: npx ts-node PATH/publish.ts [REMOTE] [BRANCH]

(optional 1st arg. is the remote name to the GitHub repo: "${githubRepo}", default: "origin")
(optional 2nd arg. is the branch to publish", default: "master")
`.trim()
    sh.echo('-e', helpMessage)
    sh.exit(0)
}

function logMsg(msg: string) {
    sh.echo('-e', msg)
}

function exitWithErrorMsg(msg: string): never {
    const paddedMsg = msg.replaceAll(/(?<=\n)/g, ' '.repeat('Error: '.length))
    sh.echo('-e', `Error: ${paddedMsg}`)
    sh.exit(1)
}

function getSelectedRemote() {
    const remoteName = process.argv[2] || 'origin'
    logMsg(`Selected remote: "${remoteName}"`)
    return remoteName
}

function getSelectedBranch() {
    const branchName = process.argv[3] || 'master'
    logMsg(`Selected branch: "${branchName}"`)
    return branchName
}

function getCommandOutput(command: string) {
    return sh.exec(command).stdout.trim()
}

function validate() {
    const requiredCommands = ['git', 'npm']
    const hasRequiredCommands = requiredCommands.every((command) => sh.which(command))
    if (!hasRequiredCommands)
        exitWithErrorMsg(
            `Missing requirements. \nThis script requires ${requiredCommands.join(', ')}.`
        )

    const hasUncommitedChanges = getCommandOutput('git status --porcelain') !== ''
    if (hasUncommitedChanges) exitWithErrorMsg('Git directory has uncommited changes.')

    const currentBranch = getCommandOutput('git rev-parse --abbrev-ref HEAD')
    const isOnCorrectBranch = currentBranch === selectedBranch
    if (!isOnCorrectBranch)
        exitWithErrorMsg(
            `Needs to be on "${selectedBranch}" branch. \nCurrently on "${currentBranch}".`
        )

    const remoteUrl = getCommandOutput(`git remote get-url ${selectedRemote}`)
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
    const headRef = getCommandOutput('git symbolic-ref -q HEAD')
    const trackingBranch = getCommandOutput(
        `git for-each-ref --format="%(upstream:short)" "${headRef}"`
    )
    const hasNoTrackingBranch = trackingBranch === ''
    if (hasNoTrackingBranch) {
        const toContinue = askBooleanQuestion(
            `Warning: Branch "${selectedBranch}" is not tracking any remote branch. Continue? (y/n): `
        )
        if (!toContinue) sh.exit(1)
        return
    }

    logMsg(`Fetching "${trackingBranch}"...`)
    sh.exec('git fetch')

    const localCommitHash = getCommandOutput('git rev-parse @')
    const remoteCommitHash = getCommandOutput(`git rev-parse @{u}`)
    const mergeBaseCommitHash = getCommandOutput(`git merge-base @ @{u}`)

    const isUpToDate = localCommitHash === remoteCommitHash
    const isAhead = remoteCommitHash === mergeBaseCommitHash
    const isBehind = localCommitHash === mergeBaseCommitHash

    if (isUpToDate || isAhead) {
        logMsg(
            `Branch "${selectedBranch}" is ${
                isUpToDate ? 'up-to-date with' : 'ahead of'
            } "${trackingBranch}". No need to pull.`
        )
        return
    }
    if (isBehind) {
        logMsg(`Branch "${selectedBranch}" is behind "${trackingBranch}". Fast-forwarding...`)
        sh.exec('git pull --ff-only')
        return
    }

    // Else, branch is divergent.
    exitWithErrorMsg(`Branch "${selectedBranch}" diverges from "${trackingBranch}".`)
}

function bumpVersion() {
    logMsg('Bumping version...')
    const versionBumpMsg = 'Bump version to v%s' // '%s' will be the package.json version
    const newVersion = getCommandOutput(`npm version patch -m "${versionBumpMsg}"`)
    logMsg(`Version bumped to ${newVersion}.`)
}

// Push commits to 'published' branch, to be auto-deployed to Github Pages via
// the Github Action - 'Deploy to GitHub Pages'.
function forcePushToPublishedBranch() {
    logMsg('Updating local "published" branch...')
    const publishedBranchExists = getCommandOutput('git branch --list published') !== ''
    if (!publishedBranchExists) sh.exec('git checkout -b published')
    else {
        sh.exec('git checkout published')
        sh.exec(`git reset --hard ${selectedBranch}`)
    }

    logMsg(`Force pushing "published" branch to "${selectedRemote}"...`)
    sh.exec(`git push -uf ${selectedRemote} published`)

    sh.exec('git checkout -') // return to previous checkout
}
