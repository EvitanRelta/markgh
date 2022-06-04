import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import StarterKit from '@tiptap/starter-kit'

export default [
    StarterKit.configure({}),
    Image.configure({
        inline: true
    }),
    Link
]