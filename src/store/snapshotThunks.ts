import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppThunkApiConfig } from '.'
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from '../converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from '../converterFunctions/helpers/removeTipTapArtifacts'
import {
    setEditorContent,
    setIsLoadingSnapshot,
    _setFileTitle,
    _setLastEditedOn,
} from './dataSlice'
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
export const clearAllSnapshots = createAsyncThunk<void, undefined, AppThunkApiConfig>(
    'data/clearAllSnapshots',
    async (_, { getState, dispatch }) => {
        const { database } = getState().data
        const snapshotIds = (await database.snapshots.toArray()).map((snapshot) => snapshot.id!)
        await database.snapshots.bulkDelete(snapshotIds)
        await dispatch(initSnapshots()) //needs this because bulkDelete doesn't cause an update in state, the snapshot list doesnt get updated
    }
)

export const loadSnapshot = createAsyncThunk<void, Snapshot, AppThunkApiConfig>(
    'data/loadSnapShot',
    async (snapshot, { dispatch }) => {
        dispatch(_setFileTitle(snapshot.fileTitle))
        dispatch(_setLastEditedOn(snapshot.lastEditedOn))

        // To indicate to the editor's 'update' listener, that the change in the
        // editor's content is due to loading of a snapshot.
        dispatch(setIsLoadingSnapshot(true))
        dispatch(setEditorContent({ content: snapshot.content }))
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
            fileTitle,
            lastEditedOn,
            content: htmlCopy.innerHTML,
        }
        await dispatch(addSnapshot(snapshot))
    }
)
