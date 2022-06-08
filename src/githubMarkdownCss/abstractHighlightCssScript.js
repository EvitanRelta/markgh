const fs = require('fs')

const inputDir = './'
const highlightCssDir = inputDir + 'syntaxHighlighting/'
const fileNames = fs
    .readdirSync(inputDir)
    .filter((fileName) => /.css$/i.test(fileName))

const getFileContents = (filePath) => fs.promises.readFile(filePath, 'utf8')
const highlightCssRegex = /^.+\.pl-\S([^\}]|\n)+\}/gm
const writeFile = (filePath, textContent) =>
    fs.promises.writeFile(filePath, textContent, 'utf8')
const removeArtifactNewlines = (text) =>
    text.replace(/(\n[^\S\n]*){3,}/g, '\n\n')
const getHighlightCssFilePath = (originalCssFilename) =>
    highlightCssDir + originalCssFilename.replace(/.css$/i, '.highlight.css')

fileNames.forEach(async (fileName) => {
    const fileText = await getFileContents(fileName)
    let highlightCss = ''

    let restOfCss = fileText.replace(highlightCssRegex, (match) => {
        highlightCss += '\n\n' + match
        return ''
    })

    restOfCss = removeArtifactNewlines(restOfCss)
    highlightCss = highlightCss.trim()

    writeFile(fileName, restOfCss)
    writeFile(getHighlightCssFilePath(fileName), highlightCss)
})
