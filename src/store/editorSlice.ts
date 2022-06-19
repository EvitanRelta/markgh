import { createSlice } from '@reduxjs/toolkit'
import { Editor } from '@tiptap/react'
import extensions from '../components/Editor/extensions/extensions'
import placeholderEditorHtml from '../placeholderEditorHtml'

const editorSlice = createSlice({
    name: 'editor',
    initialState: {
        editor: new Editor({
            extensions,
            content: placeholderEditorHtml,
        }),
    },
    reducers: {},
})

export const {} = editorSlice.actions
export const editorReducer = editorSlice.reducer
