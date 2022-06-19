import { GithubAuthProvider } from 'firebase/auth'

const githubProvider = new GithubAuthProvider()
githubProvider.addScope('repo')
export { githubProvider }
