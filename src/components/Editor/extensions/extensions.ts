import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import CodeNoExcludes from './CodeNoExcludes'
import SizedImage from './SizedImage'

export default [
    StarterKit.configure({
        code: false,
    }),
    SizedImage.configure({
        inline: true
    }),
    Link,
    Underline,
    CodeNoExcludes,
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
]