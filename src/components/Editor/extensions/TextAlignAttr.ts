import TextAlign from '@tiptap/extension-text-align'

// Replaces inline 'text-align' styles with 'align' attribute
export default TextAlign.extend({
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    textAlign: {
                        default: this.options.defaultAlignment,
                        parseHTML: element => element.getAttribute('align') || this.options.defaultAlignment,
                        renderHTML: attributes => {
                            if (attributes.textAlign === this.options.defaultAlignment) {
                                return {}
                            }

                            return { align: attributes.textAlign }
                        },
                    },
                },
            },
        ]
    },
})