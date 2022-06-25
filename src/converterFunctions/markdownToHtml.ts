import MarkdownIt from 'markdown-it'

export interface GithubRepoInfo {
    user: string
    repo: string
    branch: string
    dirPath: string
    fileName: string
}

const htmlToElement = (htmlString: string) => {
    const container = document.createElement('div')
    container.innerHTML = htmlString.trim()
    return container as Element
}

const convertRelativeImageSrc = (
    html: Element,
    { user, repo, branch, dirPath }: GithubRepoInfo
) => {
    const rootPath = `https://github.com/${user}/${repo}/raw/${branch}`
    const isRootPath = (relativePath: string) => /^\//.test(relativePath)
    const getAbsolutePath = (relativePath: string) => {
        if (isRootPath(relativePath)) return rootPath + relativePath
        return rootPath + dirPath + relativePath.replace(/^\.\//, '')
    }

    const isAbsolutePath = (url: string) => /^https?:\//.test(url)
    const isNonNullRelativePath = (url: string | null) => url !== null && !isAbsolutePath(url)
    Array.from(html.querySelectorAll('img:not(.ProseMirror-separator)'))
        .map((img) => ({ img, src: img.getAttribute('src') }))
        .filter(({ src }) => isNonNullRelativePath(src))
        .forEach(({ img, src }) => img.setAttribute('src', getAbsolutePath(src as string)))
}

export default (markdown: string, githubRepoInfo?: GithubRepoInfo) => {
    const markdownit = new MarkdownIt({ html: true, linkify: true })
    const htmlString = markdownit.render(markdown).replaceAll(/\n(?=<\/code><\/pre>)/g, '')

    const element = htmlToElement(htmlString)
    if (githubRepoInfo) convertRelativeImageSrc(element, githubRepoInfo)

    return element.innerHTML
}
