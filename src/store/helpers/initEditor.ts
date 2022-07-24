import { Editor } from '@tiptap/react'
import _ from 'lodash'
import { AppStore } from '..'
import { toMarkdown } from '../../converterFunctions'
import {
    loadInitialContent,
    saveEditorContent,
    setHasEdits,
    setIsLoadingSnapshot,
    setMarkdownText,
    _setLastEditedOn,
} from '../dataSlice'
import { editorOptions } from './editorOptions'
import { getFormatedNow } from './getFormatedNow'

let store!: AppStore
export const _injectStore = (_store: AppStore) => {
    store = _store
}

const onTextChange = (editorContainer: Element) => {
    const { getState, dispatch } = store
    const { isLoadingSnapshot } = getState().data
    const markdown = toMarkdown(editorContainer)
    dispatch(setMarkdownText(markdown))

    // If the change is due to loading of a snapshot, then
    // don't update 'lastEditedOn'.
    if (!isLoadingSnapshot) {
        dispatch(_setLastEditedOn(getFormatedNow()))
        dispatch(setHasEdits(true))
    } else dispatch(setIsLoadingSnapshot(false))

    dispatch(saveEditorContent())
}

const editor = new Editor(editorOptions)

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
