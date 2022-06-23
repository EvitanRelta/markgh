import align from './align'
import codeBlocks from './codeBlocks'
import ignoreTipTapArtifacts from './ignoreTipTapArtifacts'
import lineBreak from './lineBreak'
import noListItemSpacing from './noListItemSpacing'
import resizedImage from './resizedImage'
import strikethrough from './strikethrough'
import subscript from './subscript'
import superscript from './superscript'
import underline from './underline'

export const plugins = [
    align,
    codeBlocks,
    lineBreak,
    noListItemSpacing,
    resizedImage,
    strikethrough,
    underline,
    subscript,
    superscript,

    // Must be last
    ignoreTipTapArtifacts,
]
