const fs = require('fs')

const inputDir = './'
const githubClassPrefix = 'pl-'
const hljsClassPrefix = 'hljs-'
const githubToHljsClassMapping = {
    ent: ['name', `name.${hljsClassPrefix}tag`],
    c1: ['attr', 'number', 'attribute', 'literal', `attr.${hljsClassPrefix}tag`],
    s: ['string', `string.${hljsClassPrefix}tag`],
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
const addThemeName = (fileName, text) => {
    const theme = /^[^.]+/.exec(fileName)[0]
    return text.replaceAll(/(?<=.markdown-body)/g, `.gh-${theme}`)
}

fileNames.forEach(async (fileName) => {
    const fileText = await getFileContents(fileName)
    const outputText = addThemeName(fileName, replaceAllGithubClassNames(fileText))

    writeFile(fileName, outputText)
})
