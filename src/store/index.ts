import { configureStore } from '@reduxjs/toolkit'
import { editorReducer } from './editorSlice'
import { mdTextReducer } from './mdTextSlice'

export const store = configureStore({
    reducer: {
        editor: editorReducer,
        mdText: mdTextReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
