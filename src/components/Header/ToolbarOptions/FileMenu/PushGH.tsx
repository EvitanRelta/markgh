import FS from '@isomorphic-git/lightning-fs'
import { MenuItem } from '@mui/material'
import { gitClone } from '../../../../scripts/helpers/gitActions'

const fs = new FS('fs')
const dir = '/'
window.global = window
window.Buffer = window.Buffer || require('buffer').Buffer

export const PushGH = () => {
    return (
        <MenuItem
            divider
            onClick={(e) =>
                gitClone(fs, 'https://github.com/swxk19/markgh.git', localStorage['ghToken'])
            }
        >
            Push README to Repo
        </MenuItem>
    )
}
