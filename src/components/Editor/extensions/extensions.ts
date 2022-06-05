import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import CodeNoExcludes from './CodeNoExcludes'
import SizedImage from './SizedImage'

export default [
    StarterKit.configure({}),
    SizedImage.configure({
        inline: true
    }),
    Link,
    Underline,
    CodeNoExcludes,
]