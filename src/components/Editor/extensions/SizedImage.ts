import Image from '@tiptap/extension-image'

// Based on https://github.com/ueberdosis/tiptap/issues/1365#issuecomment-853799239
export default Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            width: { default: null, },
            height: { default: null, },
        }
    },
})