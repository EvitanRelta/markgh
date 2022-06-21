import TableHeader from '@tiptap/extension-table-header'

export default TableHeader.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            width: { default: null },
        }
    },
})
