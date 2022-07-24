import { Editor } from '@tiptap/react'
import { toMarkdown } from '../../converterFunctions'
import { editorOptions } from '../../store/helpers/editorOptions'

export const initMdConversionEmulator = () => {
    const editor = new Editor(editorOptions)

    return (htmlContent: string, preserveWhitespace?: boolean | 'full'): Promise<string> => {
        return new Promise((resolve) => {
            const onUpdate: Parameters<typeof editor.on<'update'>>[1] = ({ editor }) => {
                editor.off('update', onUpdate)
                const editorContainer = editor.view.dom
                const markdown = toMarkdown(editorContainer)
                resolve(markdown)
            }
            editor.on('update', onUpdate)
            editor.commands.clearContent(false)

            const parseOptions = preserveWhitespace ? { preserveWhitespace } : undefined
            editor.commands.setContent(htmlContent, true, parseOptions)
        })
    }
}
