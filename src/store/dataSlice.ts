import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Editor } from '@tiptap/react'
import type { AppThunkApiConfig } from '.'
import { EditorDB } from '../components/IndexedDB/initDB'
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from '../converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from '../converterFunctions/helpers/removeTipTapArtifacts'
import { formatDateTime } from './helpers/formatDateTime'
import { editor } from './helpers/initEditor'

interface DataState {
    editor: Editor
    database: EditorDB
    markdownText: string
    lastEditedOn: string
    fileTitle: string
}

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        editor,
        database: new EditorDB(),
        markdownText: '',
        lastEditedOn: localStorage['lastEditedOn'] ?? formatDateTime(new Date()),
        fileTitle: '',
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
        setFileTitle(state, actions: PayloadAction<string>) {
            return {
                ...state,
                fileTitle: actions.payload,
            }
        },
        setEditorContent(state, actions: PayloadAction<string>) {
            const { editor } = state
            editor.commands.clearContent(false)
            editor.commands.setContent(actions.payload, true, { preserveWhitespace: 'full' })
            return state
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

export const loadPersistentContent = createAsyncThunk<void, undefined, AppThunkApiConfig>(
    'data/loadPersistentContent',
    async (_, { getState, dispatch }) => {
        const { database } = getState().data
        const persistentContent = await database.text.get(0)

        if (!persistentContent) return
        dispatch(setEditorContent(persistentContent.value))
    }
)

export const { setMarkdownText, setLastEditedOn, setFileTitle, setEditorContent } =
    dataSlice.actions
export const dataReducer = dataSlice.reducer
