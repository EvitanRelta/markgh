import TableCell from '@tiptap/extension-table-cell'

export default TableCell.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            width: { default: null },
        }
    },
})
