import BulletList from '@tiptap/extension-bullet-list'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Link from '@tiptap/extension-link'
import OrderedList from '@tiptap/extension-ordered-list'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
// Types hasn't been updated.
// @ts-expect-error
import { lowlight } from 'lowlight'
import CodeNoExcludes from './CodeNoExcludes'
import SizedImage from './SizedImage'
import TextAlignAttr from './TextAlignAttr'

export default [
    StarterKit.configure({
        code: false,
        bulletList: false,
        orderedList: false,
        codeBlock: false,
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
    CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'plaintext',
    }),
]
