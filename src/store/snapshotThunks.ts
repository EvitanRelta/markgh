import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppThunkApiConfig } from '.'
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from '../converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from '../converterFunctions/helpers/removeTipTapArtifacts'
import { setEditorContent, setFileTitle } from './dataSlice'
import { Snapshot } from './helpers/initDatabase'

export const initSnapshots = createAsyncThunk<Snapshot[], undefined, AppThunkApiConfig>(
    'data/initSnapshots',
    async (_, { getState }) => {
        const { database } = getState().data
        const snapshots = await database.snapshots.toArray()
        return snapshots
    }
)

export const addSnapshot = createAsyncThunk<Required<Snapshot>, Snapshot, AppThunkApiConfig>(
    'data/addSnapshot',
    async (snapshot, { getState }) => {
        const { database } = getState().data
        const snapshotId = await database.snapshots.add(snapshot)
        return {
            ...snapshot,
            id: snapshotId,
        }
    }
)

export const deleteSnapshot = createAsyncThunk<void, Required<Snapshot>['id'], AppThunkApiConfig>(
    'data/deleteSnapshot',
    async (snapshot, { getState }) => {
        const { database } = getState().data
        await database.snapshots.delete(snapshot)
    }
)

export const loadSnapshot = createAsyncThunk<void, Snapshot, AppThunkApiConfig>(
    'data/loadSnapShot',
    async (snapshot, { dispatch }) => {
        dispatch(setFileTitle(snapshot.title))
        dispatch(setEditorContent(snapshot.value))
    }
)

export const saveSnapshot = createAsyncThunk<void, undefined, AppThunkApiConfig>(
    'data/saveSnapshot',
    async (_, { getState, dispatch }) => {
        const { fileTitle, lastEditedOn, editor } = getState().data
        const htmlCopy = editor.view.dom.cloneNode(true) as HTMLElement
        removeCodeBlockWrapper(htmlCopy)
        removeImageWrapper(htmlCopy)
        removeTipTapArtifacts(htmlCopy)

        const snapshot: Snapshot = {
            title: fileTitle,
            savedOn: lastEditedOn,
            value: htmlCopy.innerHTML,
        }
        await dispatch(addSnapshot(snapshot))
    }
)
