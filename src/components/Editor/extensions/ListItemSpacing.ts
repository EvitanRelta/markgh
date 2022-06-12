import { Extension } from '@tiptap/core'

export interface ListItemSpacingOptions {
    defaultSpacing: boolean
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        listItemSpacing: {
            // Adds spacing between list items
            setListItemSpacing: () => ReturnType
            // Removes spacing between list items
            unsetListItemSpacing: () => ReturnType
        }
    }
}

export const ListItemSpacing = Extension.create<ListItemSpacingOptions>({
    name: 'listItemSpacing',

    addOptions() {
        return { defaultSpacing: true }
    },

    addGlobalAttributes() {
        return [
            {
                types: ['listItem'],
                attributes: {
                    listItemSpacing: {
                        default: this.options.defaultSpacing,
                        parseHTML: (element) => {
                            console.log([element.cloneNode(true)])
                            return !element.classList.contains(
                                'no-list-item-spacing'
                            )
                        },

                        renderHTML: (attributes) => {
                            if (!attributes.listItemSpacing) return {}
                            return { class: 'no-list-item-spacing' }
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setListItemSpacing:
                () =>
                ({ commands }) =>
                    ['listItem'].every((type) =>
                        commands.updateAttributes(type, {
                            listItemSpacing: true,
                        })
                    ),

            unsetListItemSpacing:
                () =>
                ({ commands }) =>
                    ['listItem'].every((type) =>
                        commands.updateAttributes(type, {
                            listItemSpacing: false,
                        })
                    ),
        }
    },
})
