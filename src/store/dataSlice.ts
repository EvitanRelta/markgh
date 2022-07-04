import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Editor } from '@tiptap/react'
import type { AppStore } from '.'
import { extensions } from '../components/Editor/extensions/extensions'
import { placeholderEditorHtml } from '../placeholderEditorHtml'

let store!: AppStore

// 'injectStore' code source:
// https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
export const injectStore = (_store: AppStore) => {
    store = _store
}

interface DataState {
    editor: Editor
    markdownText: string
    lastEditedOn: string
}

const editor = new Editor({
    extensions,
    content: placeholderEditorHtml,
    parseOptions: { preserveWhitespace: 'full' },
})

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        editor,
        markdownText: '',
        lastEditedOn: localStorage['lastEditedOn'],
    } as DataState,
    reducers: {
        setMarkdownText(state, actions: PayloadAction<string>) {
            return {
                ...state,
                markdownText: actions.payload,
            }
        },
        setLastEditedOn(state, actions: PayloadAction<string>) {
            localStorage['lastEditedOn'] = actions.payload
            return {
                ...state,
                lastEditedOn: actions.payload,
            }
        },
    },
})

export const { setMarkdownText, setLastEditedOn } = dataSlice.actions
export const dataReducer = dataSlice.reducer
