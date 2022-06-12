import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import CodeNoExcludes from './CodeNoExcludes'
import { ListItemSpacing } from './ListItemSpacing'
import SizedImage from './SizedImage'
import TextAlignAttr from './TextAlignAttr'

export default [
    StarterKit.configure({
        code: false,
    }),
    SizedImage.configure({
        inline: true,
    }),
    Link,
    Underline,
    CodeNoExcludes,
    TextAlignAttr.configure({
        types: ['heading', 'paragraph'],
    }),
    ListItemSpacing,
]
