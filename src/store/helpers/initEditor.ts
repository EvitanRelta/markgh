import { Editor } from '@tiptap/react'
import _ from 'lodash'
import { AppStore } from '..'
import { extensions } from '../../components/Editor/extensions/extensions'
import { toMarkdown } from '../../converterFunctions'
import { placeholderEditorHtml } from '../../placeholderEditorHtml'
import { saveEditorContent, setLastEditedOn, setMarkdownText } from '../dataSlice'
import { formatDateTime } from './formatDateTime'

let store!: AppStore

// 'injectStore' code source:
// https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
export const injectStore = (_store: AppStore) => {
    store = _store
}

const onTextChange = (editorContainer: Element) => {
    const { dispatch } = store
    const markdown = toMarkdown(editorContainer)
    dispatch(saveEditorContent())
    dispatch(setMarkdownText(markdown))

    const now = new Date()
    const formatedNow = formatDateTime(now)

    dispatch(setLastEditedOn(formatedNow))
}

const editor = new Editor({
    extensions,
    content: placeholderEditorHtml,
    parseOptions: { preserveWhitespace: 'full' },
})

editor.on('create', ({ editor }) => {
    onTextChange(editor.view.dom)
})

editor.on(
    'update',
    _.debounce(({ editor }) => {
        onTextChange(editor.view.dom)
    }, 50)
)

export { editor }
