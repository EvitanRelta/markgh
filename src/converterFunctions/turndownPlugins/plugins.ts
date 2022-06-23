import align from './align'
import codeBlocks from './codeBlocks'
import ignoreTipTapArtifacts from './ignoreTipTapArtifacts'
import lineBreak from './lineBreak'
import resizedImage from './resizedImage'
import strikethrough from './strikethrough'
import subscript from './subscript'
import superscript from './superscript'
import tables from './table'
import underline from './underline'

export const plugins = [
    align,
    codeBlocks,
    lineBreak,
    resizedImage,
    strikethrough,
    underline,
    subscript,
    superscript,
    tables,

    // Must be last
    ignoreTipTapArtifacts,
]
