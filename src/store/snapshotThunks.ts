import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppThunkApiConfig } from '.'
import {
    removeCodeBlockWrapper,
    removeImageWrapper,
} from '../converterFunctions/helpers/preProcessHtml'
import { removeTipTapArtifacts } from '../converterFunctions/helpers/removeTipTapArtifacts'
import { setEditorContent, _setFileTitle, _setLastEditedOn } from './dataSlice'
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
        dispatch(_setFileTitle(snapshot.fileTitle))
        dispatch(_setLastEditedOn(snapshot.lastEditedOn))
        dispatch(setEditorContent(snapshot.content))
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
