import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Editor } from '@tiptap/react'
import type { AppThunkApiConfig } from '.'
import { EditorDB } from '../components/IndexedDB/initDB'
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from '../converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from '../converterFunctions/helpers/removeTipTapArtifacts'
import { editor } from './helpers/initEditor'

interface DataState {
    editor: Editor
    database: EditorDB
    markdownText: string
    lastEditedOn: string
}

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        editor,
        database: new EditorDB(),
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

export const saveEditorContent = createAsyncThunk<void, undefined, AppThunkApiConfig>(
    'data/saveEditorContent',
    async (_, { getState, rejectWithValue }) => {
        const { editor, database } = getState().data
        try {
            const htmlCopy = editor.view.dom.cloneNode(true) as HTMLElement
            removeCodeBlockWrapper(htmlCopy)
            removeImageWrapper(htmlCopy)
            removeTipTapArtifacts(htmlCopy)

            await database.transaction('rw', database.text, () =>
                database.text.put({ id: 0, value: htmlCopy.innerHTML })
            )
        } catch (e) {
            return rejectWithValue(e as Error)
        }
    }
)

export const { setMarkdownText, setLastEditedOn } = dataSlice.actions
export const dataReducer = dataSlice.reducer
