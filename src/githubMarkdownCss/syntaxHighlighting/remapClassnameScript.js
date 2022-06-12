const fs = require('fs')

const inputDir = './'
const githubClassPrefix = 'pl-'
const hljsClassPrefix = 'hljs-'
const githubToHljsClassMapping = {
    ent: ['name'],
    c1: ['attr', 'number', 'attribute', 'literal'],
    s: ['string'],
    k: ['keyword', 'type'],
    v: ['title.class_'],
    c: ['comment'],
    // s1: ['title.function_'],
    en: ['built_in', 'title.function_', 'title'],
    smi: ['tag', 'params'],
}

const fileNames = fs.readdirSync(inputDir).filter((fileName) => /.highlight.css$/i.test(fileName))

const getFileContents = (filePath) => fs.promises.readFile(filePath, 'utf8')
const writeFile = (filePath, textContent) => fs.promises.writeFile(filePath, textContent, 'utf8')
const getCssSelectorRegex = (githubClassName) =>
    new RegExp(`(?<=^|[},]\\s*)(\\S.+\\.)(${githubClassName})(?![a-zA-Z0-9_-])([^,{]*[^,{ ])?`, 'g')
const replaceGithubClassName = (text, [githubClassName, arrHljsClassNames]) => {
    const cssSelectorRegex = getCssSelectorRegex(githubClassPrefix + githubClassName)
    return text.replace(cssSelectorRegex, (_, strBefClassName, __, strAftClassName = '') =>
        arrHljsClassNames
            .map((x) => hljsClassPrefix + x)
            .map((replacementClassName) => strBefClassName + replacementClassName + strAftClassName)
            .join(',\n')
    )
}
const replaceAllGithubClassNames = (text) =>
    Object.entries(githubToHljsClassMapping).reduce(replaceGithubClassName, text)

fileNames.forEach(async (fileName) => {
    const fileText = await getFileContents(fileName)
    const outputText = replaceAllGithubClassNames(fileText)

    writeFile(fileName, outputText)
})
