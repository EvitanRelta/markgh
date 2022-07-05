import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Editor } from '@tiptap/react'
import _ from 'lodash'
import type { AppStore, AppThunkApiConfig } from '.'
import { extensions } from '../components/Editor/extensions/extensions'
import { EditorDB } from '../components/IndexedDB/initDB'
import { toMarkdown } from '../converterFunctions'
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from '../converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from '../converterFunctions/helpers/removeTipTapArtifacts'
import { placeholderEditorHtml } from '../placeholderEditorHtml'

let store!: AppStore

// 'injectStore' code source:
// https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
export const injectStore = (_store: AppStore) => {
    store = _store
}

interface DataState {
    editor: Editor
    database: EditorDB
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

const saveEditorContent = createAsyncThunk<void, undefined, AppThunkApiConfig>(
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

const onTextChange = (editorContainer: Element) => {
    const { dispatch } = store
    const markdown = toMarkdown(editorContainer)
    dispatch(saveEditorContent())
    dispatch(setMarkdownText(markdown))

    const now = new Date()
    const formatedNow = now.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
    })

    dispatch(setLastEditedOn(formatedNow))
}

editor.on('create', ({ editor }) => {
    onTextChange(editor.view.dom)
})

editor.on(
    'update',
    _.debounce(({ editor }) => {
        onTextChange(editor.view.dom)
    }, 50)
)

export const { setMarkdownText, setLastEditedOn } = dataSlice.actions
export const dataReducer = dataSlice.reducer
