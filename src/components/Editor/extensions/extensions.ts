import BulletList from '@tiptap/extension-bullet-list'
import Link from '@tiptap/extension-link'
import OrderedList from '@tiptap/extension-ordered-list'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { CodeNoExcludes } from './CodeNoExcludes'
import { ListItemNoTabNav } from './ListItemNoTabNav'
import { SizedImage } from './SizedImage'
import { SyntaxHighlightCodeBlock } from './SyntaxHighlightCodeBlock'
import { TabKey } from './TabKey'
import { TextAlignAttr } from './TextAlignAttr'

export const extensions = [
    StarterKit.configure({
        code: false,
        bulletList: false,
        orderedList: false,
        codeBlock: false,
        listItem: false,
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
    BulletList.configure({
        HTMLAttributes: { class: 'no-list-item-spacing' },
    }),
    OrderedList.configure({
        HTMLAttributes: { class: 'no-list-item-spacing' },
    }),
    ListItemNoTabNav,
    SyntaxHighlightCodeBlock,
    TabKey,
    Superscript,
    Subscript,
]
