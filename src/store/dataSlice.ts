import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Editor } from '@tiptap/react'
import type { AppThunkApiConfig } from '.'
import { markdownToHtml } from '../converterFunctions'
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from '../converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from '../converterFunctions/helpers/removeTipTapArtifacts'
import { GithubRepoInfo } from '../converterFunctions/markdownToHtml'
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

    // To indicate to the editor's 'update' listener, that the change in the
    // editor's content is due to loading of a snapshot.
    isLoadingSnapshot: boolean

    // To indicate if there's been any edits since loading in a snapshot.
    hasEdits: boolean
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
        isLoadingSnapshot: false,
        hasEdits: false,
    } as DataState,
    reducers: {
        setMarkdownText(state, actions: PayloadAction<string>) {
            state.markdownText = actions.payload
        },

        // Set 'lastEditedOn' without side effects.
        _setLastEditedOn(state, actions: PayloadAction<string>) {
            state.lastEditedOn = actions.payload
        },

        // Set 'fileTitle' without side effects.
        _setFileTitle(state, actions: PayloadAction<string>) {
            state.fileTitle = actions.payload
        },
        setShowMarkdown(state, actions: PayloadAction<boolean>) {
            localStorage['showMarkdown'] = String(actions.payload)
            state.showMarkdown = actions.payload
        },
        setIsEditorLoading(state, actions: PayloadAction<boolean>) {
            state.isEditorLoading = actions.payload
        },
        setIsLoadingSnapshot(state, actions: PayloadAction<boolean>) {
            state.isLoadingSnapshot = actions.payload
        },
        setHasEdits(state, actions: PayloadAction<boolean>) {
            state.hasEdits = actions.payload
        },
        setEditorContent(
            state,
            actions: PayloadAction<{ content: string; fullWhitespace?: boolean }>
        ) {
            const { editor } = state
            const { content, fullWhitespace } = actions.payload
            editor.commands.clearContent(false)
            editor.commands.setContent(
                content,
                true,
                fullWhitespace === false ? undefined : { preserveWhitespace: 'full' }
            )
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

// Set 'lastEditedOn' and save the change.
export const setLastEditedOn = createAsyncThunk<void, string, AppThunkApiConfig>(
    'data/setLastEditedOn',
    async (newLastEditedOn, { dispatch }) => {
        dispatch(_setLastEditedOn(newLastEditedOn))
        dispatch(setHasEdits(true))
        dispatch(saveEditorContent())
    }
)

// Set 'fileTitle' and save the change.
export const setFileTitle = createAsyncThunk<void, string, AppThunkApiConfig>(
    'data/setFileTitle',
    async (newFileTitle, { dispatch }) => {
        dispatch(_setFileTitle(newFileTitle))
        dispatch(_setLastEditedOn(getFormatedNow()))
        dispatch(setHasEdits(true))
        dispatch(saveEditorContent())
    }
)

export interface ImportMarkdownOptions {
    fileTitle: string
    markdown: string
    githubRepoInfo?: GithubRepoInfo
}
export const importMarkdown = createAsyncThunk<void, ImportMarkdownOptions, AppThunkApiConfig>(
    'data/importMarkdown',
    async ({ fileTitle, markdown, githubRepoInfo }, { dispatch }) => {
        dispatch(_setFileTitle(fileTitle))
        dispatch(
            setEditorContent({
                content: markdownToHtml(markdown, githubRepoInfo),
                fullWhitespace: false,
            })
        )
        // Saving is done by the editor's "update" event listener.
    }
)

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
        dispatch(setHasEdits(true))
        await dispatch(initSnapshots())
        dispatch(setIsEditorLoading(false))
    }
)

export const {
    setMarkdownText,
    _setLastEditedOn,
    _setFileTitle,
    setShowMarkdown,
    setIsEditorLoading,
    setIsLoadingSnapshot,
    setHasEdits,
    setEditorContent,
} = dataSlice.actions
export const dataReducer = dataSlice.reducer
