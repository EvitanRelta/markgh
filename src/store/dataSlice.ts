import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Editor } from '@tiptap/react'
import { extensions } from '../components/Editor/extensions/extensions'
import { placeholderEditorHtml } from '../placeholderEditorHtml'

interface DataState {
    editor: Editor
    markdownText: string
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
    } as DataState,
    reducers: {
        setMarkdownText(state, actions: PayloadAction<string>) {
            return {
                ...state,
                markdownText: actions.payload,
            }
        },
    },
})

export const { setMarkdownText } = dataSlice.actions
export const dataReducer = dataSlice.reducer
