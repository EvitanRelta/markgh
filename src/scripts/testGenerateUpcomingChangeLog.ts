import { generateChangeLogText } from './helpers/changeLogHelpers/generateChangeLogText'
import { getChangesFromScrappedCommits } from './helpers/changeLogHelpers/getChangesFromScrappedCommits'
import { scrapeCommitData } from './helpers/changeLogHelpers/scrapeCommitData'
import { getCommitHash, getCommitHashFromTag, getLatestTag } from './helpers/gitHelpers'
import { writeToFile } from './helpers/writeToFile'
;(async () => {
    const latestTag = getLatestTag()
    const scrappedCommits = scrapeCommitData(
        getCommitHashFromTag(latestTag),
        getCommitHash('HEAD'),
        false,
        true
    )
    const changesSinceLastTag = await getChangesFromScrappedCommits(scrappedCommits)
    const changeLog = generateChangeLogText(changesSinceLastTag)
    await writeToFile(`./upcoming-changelog.temp.md`, changeLog)
})()
