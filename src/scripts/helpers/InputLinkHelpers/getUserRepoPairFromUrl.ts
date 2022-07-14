export const getUserRepoPairFromUrl = (url: string) => {
    return /github.com\/([\w-]+)\/([\w-]+)/i.exec(url)?.slice(1) as [string, string]
}
