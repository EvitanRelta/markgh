import ListItem from '@tiptap/extension-list-item'

// Prevent navigation to other elements when pressing Tab.
export const ListItemNoTabNav = ListItem.extend({
    addKeyboardShortcuts() {
        return {
            ...this.parent?.(),
            Tab: () => {
                this.editor.commands.sinkListItem(this.name)
                return true
            },
        }
    },
})
