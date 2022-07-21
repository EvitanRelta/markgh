import { generateChangeLogText } from './helpers/changeLogHelpers/generateChangeLogText'
import { getChangesFromScrappedCommits } from './helpers/changeLogHelpers/getChangesFromScrappedCommits'
import { scrapeCommitData } from './helpers/changeLogHelpers/scrapeCommitData'
import { getCommitHashFromTag, getPreviousTag } from './helpers/gitHelpers'
import { exitWithErrorMsg, logMsg } from './helpers/shellHelpers'
import { writeToFile } from './helpers/writeToFile'
;(async () => {
    const tag = getGivenTag()
    const previousTag = getPreviousTag(tag)
    const scrappedCommits = scrapeCommitData(
        getCommitHashFromTag(previousTag),
        getCommitHashFromTag(tag),
        false,
        true
    )
    const tagChanges = await getChangesFromScrappedCommits(scrappedCommits)
    const changeLog = generateChangeLogText(tagChanges, { tag, previousTag })
    await writeToFile(`./changelog.${tag}.temp.md`, changeLog)
})()

function getGivenTag() {
    const tag = process.argv[2]
    if (!tag) exitWithErrorMsg('Required 1st argument (ie. tag name) is not specified.')

    logMsg(`Selected tag: "${tag}"`)
    return tag
}
