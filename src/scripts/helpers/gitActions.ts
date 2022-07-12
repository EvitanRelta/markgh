import FS from '@isomorphic-git/lightning-fs'
import git from 'isomorphic-git'
import http from 'isomorphic-git/http/web'

const dir = '/'
export const gitClone = (fs: FS, url: string, token: string) => {
    console.log('run')
    git.clone({
        fs,
        http,
        dir,
        url: url,
        singleBranch: true,
        depth: 1,
        onAuth: () => ({
            username: token,
            password: 'x-oauth-basic',
        }),
    })
}
