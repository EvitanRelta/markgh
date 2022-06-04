import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import SizedImage from './SizedImage'

export default [
    StarterKit.configure({}),
    SizedImage.configure({
        inline: true
    }),
    Link,
    Underline,
]