import { align } from './align'
import { code } from './code'
import { codeBlocks } from './codeBlocks'
import { emptyParagraph } from './emptyParagraph'
import { lineBreak } from './lineBreak'
import { resizedImage } from './resizedImage'
import { startOrEndWithSpace } from './startOrEndWithSpace'
import { strikethrough } from './strikethrough'
import { subscript } from './subscript'
import { superscript } from './superscript'
import { underline } from './underline'

export const plugins = [
    align,
    code,
    codeBlocks,
    emptyParagraph,
    lineBreak,
    resizedImage,
    strikethrough,
    underline,
    subscript,
    superscript,

    // Must be last, so that it's highest priority.
    startOrEndWithSpace,
]
