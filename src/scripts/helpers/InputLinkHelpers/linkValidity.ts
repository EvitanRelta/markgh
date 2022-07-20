export const isGithubRepoUrl = (url: string) =>
    /(https?:\/\/)?(www\.)?github.com(\/[\w-]+){2}/i.test(url)

export const isRawGithubMarkdownUrl = (url: string) =>
    /(https?:\/\/)?raw\.githubusercontent.com(\/[\w-]+){4,}.md/i.test(url)

export const isValidImportLink = (url: string) =>
    isGithubRepoUrl(url) || isRawGithubMarkdownUrl(url)
