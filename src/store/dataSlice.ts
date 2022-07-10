import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Editor } from '@tiptap/react'
import type { AppThunkApiConfig } from '.'
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from '../converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from '../converterFunctions/helpers/removeTipTapArtifacts'
import { placeholderEditorHtml } from '../placeholderEditorHtml'
import { formatDateTime } from './helpers/formatDateTime'
import { EditorDB } from './helpers/initDatabase'
import { editor } from './helpers/initEditor'

interface DataState {
    editor: Editor
    database: EditorDB
    markdownText: string
    lastEditedOn: string
    fileTitle: string
    showMarkdown: boolean
    isEditorLoading: boolean
}

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        editor,
        database: new EditorDB(),
        markdownText: '',
        lastEditedOn: localStorage['lastEditedOn'] ?? formatDateTime(new Date()),
        fileTitle: '',
        showMarkdown: localStorage['showMarkdown'] === 'true', // localStorage cannot store boolean
        isEditorLoading: true,
    } as DataState,
    reducers: {
        setMarkdownText(state, actions: PayloadAction<string>) {
            state.markdownText = actions.payload
        },
        setLastEditedOn(state, actions: PayloadAction<string>) {
            localStorage['lastEditedOn'] = actions.payload
            state.lastEditedOn = actions.payload
        },
        setFileTitle(state, actions: PayloadAction<string>) {
            state.fileTitle = actions.payload
        },
        setShowMarkdown(state, actions: PayloadAction<boolean>) {
            localStorage['showMarkdown'] = String(actions.payload)
            state.showMarkdown = actions.payload
        },
        setIsEditorLoading(state, actions: PayloadAction<boolean>) {
            state.isEditorLoading = actions.payload
        },
        setEditorContent(state, actions: PayloadAction<string>) {
            const { editor } = state
            editor.commands.clearContent(false)
            editor.commands.setContent(actions.payload, true, { preserveWhitespace: 'full' })
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

export const loadInitialContent = createAsyncThunk<void, undefined, AppThunkApiConfig>(
    'data/loadInitialContent',
    async (_, { getState, dispatch }) => {
        const { database } = getState().data
        const persistentContent = await database.text.get(0)
        const initialContent = persistentContent?.value ?? placeholderEditorHtml

        dispatch(setEditorContent(initialContent))
        dispatch(setIsEditorLoading(false))
    }
)

export const {
    setMarkdownText,
    setLastEditedOn,
    setFileTitle,
    setShowMarkdown,
    setIsEditorLoading,
    setEditorContent,
} = dataSlice.actions
export const dataReducer = dataSlice.reducer
