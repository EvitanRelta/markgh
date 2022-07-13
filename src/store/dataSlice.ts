import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Editor } from '@tiptap/react'
import type { AppThunkApiConfig } from '.'
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from '../converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from '../converterFunctions/helpers/removeTipTapArtifacts'
import { placeholderEditorHtml } from '../placeholderEditorHtml'
import { getFormatedNow } from './helpers/getFormatedNow'
import { database, EditorDBInstance, Snapshot } from './helpers/initDatabase'
import { editor } from './helpers/initEditor'
import { addSnapshot, deleteSnapshot, initSnapshots, loadSnapshot } from './snapshotThunks'

interface DataState {
    editor: Editor
    database: EditorDBInstance
    markdownText: string
    lastEditedOn: string
    fileTitle: string
    showMarkdown: boolean
    isEditorLoading: boolean
    snapshots: Snapshot[]
}

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        editor,
        database,
        markdownText: '',
        lastEditedOn: '',
        fileTitle: '',
        showMarkdown: localStorage['showMarkdown'] === 'true', // localStorage cannot store boolean
        isEditorLoading: true,
        snapshots: [],
    } as DataState,
    reducers: {
        setMarkdownText(state, actions: PayloadAction<string>) {
            state.markdownText = actions.payload
        },
        setLastEditedOn(state, actions: PayloadAction<string>) {
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
    extraReducers(builder) {
        builder.addCase(initSnapshots.fulfilled, (state, actions) => {
            state.snapshots = actions.payload
        })
        builder.addCase(addSnapshot.fulfilled, (state, actions) => {
            state.snapshots.push(actions.payload)
        })
        builder.addCase(deleteSnapshot.fulfilled, (state, actions) => {
            const snapshotId = actions.meta.arg
            state.snapshots = state.snapshots.filter((snapshot) => snapshot.id !== snapshotId)
        })
    },
})

export const saveEditorContent = createAsyncThunk<void, undefined, AppThunkApiConfig>(
    'data/saveEditorContent',
    async (_, { getState, rejectWithValue }) => {
        const { editor, database, fileTitle, lastEditedOn } = getState().data
        try {
            const htmlCopy = editor.view.dom.cloneNode(true) as HTMLElement
            removeCodeBlockWrapper(htmlCopy)
            removeImageWrapper(htmlCopy)
            removeTipTapArtifacts(htmlCopy)

            type CurrentContentTable = typeof database.currentContent

            await database.transaction('rw', database.currentContent, (trans) => {
                const currentContentTable: CurrentContentTable = trans.table('currentContent')
                currentContentTable.put({
                    id: 0,
                    fileTitle,
                    lastEditedOn,
                    content: htmlCopy.innerHTML,
                })
            })
        } catch (e) {
            return rejectWithValue(e as Error)
        }
    }
)

export const loadInitialContent = createAsyncThunk<void, undefined, AppThunkApiConfig>(
    'data/loadInitialContent',
    async (_, { getState, dispatch }) => {
        const { database } = getState().data
        const currentContent = await database.currentContent.get(0)

        const initialData = currentContent ?? {
            fileTitle: '',
            lastEditedOn: getFormatedNow(),
            content: placeholderEditorHtml,
        }

        await dispatch(loadSnapshot(initialData))
        await dispatch(initSnapshots())
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
