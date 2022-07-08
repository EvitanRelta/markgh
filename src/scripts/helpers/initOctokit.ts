import dotenv from 'dotenv'
import { resolve } from 'path'

const dotEnvPath = resolve(__dirname, '../../../.env')
const result = dotenv.config({ path: dotEnvPath })
if (result.error) throw result.error

import { Octokit } from '@octokit/rest'

const token = process.env.GITHUB_TOKEN
if (!token) throw new Error(`"GITHUB_TOKEN" not found in the .env file: "${dotEnvPath}".`)

export const octokit = new Octokit({ auth: token })
