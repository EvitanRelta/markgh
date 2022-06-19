import { configureStore } from '@reduxjs/toolkit'
import { editorReducer } from './editorSlice'

export const store = configureStore({
    reducer: {
        editor: editorReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
