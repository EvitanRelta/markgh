import { Plugin } from 'turndown'
import tipTapArtifactClassNames from '../helpers/tipTapArtifactClassNames'

const ignoreTipTapArtifacts: Plugin = (service) => {
    service.addRule('ignoreTipTapArtifacts', {
        filter: (node, options) =>
            tipTapArtifactClassNames.some((className) => node.classList.contains(className)),
        replacement: (content, node, options) => '',
    })
}

export default ignoreTipTapArtifacts
