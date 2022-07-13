import { Editor } from '@tiptap/react'
import _ from 'lodash'
import { AppStore } from '..'
import { extensions } from '../../components/Editor/extensions/extensions'
import { toMarkdown } from '../../converterFunctions'
import {
    loadInitialContent,
    saveEditorContent,
    setLastEditedOn,
    setMarkdownText,
} from '../dataSlice'
import { getFormatedNow } from './getFormatedNow'

let store!: AppStore
export const _injectStore = (_store: AppStore) => {
    store = _store
}

const onTextChange = (editorContainer: Element) => {
    const { dispatch } = store
    const markdown = toMarkdown(editorContainer)
    dispatch(saveEditorContent())
    dispatch(setMarkdownText(markdown))
    dispatch(setLastEditedOn(getFormatedNow()))
}

const editor = new Editor({
    extensions,
    parseOptions: { preserveWhitespace: 'full' },
})

editor.on('create', ({ editor }) => {
    const { dispatch } = store
    dispatch(loadInitialContent())
})

editor.on(
    'update',
    _.debounce(({ editor }) => {
        onTextChange(editor.view.dom)
    }, 50)
)

export { editor }
