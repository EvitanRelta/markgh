import { configureStore } from '@reduxjs/toolkit'
import { editorReducer } from './editorSlice'
import { mdTextReducer } from './mdTextSlice'
import { themeReducer } from './themeSlice'

export const store = configureStore({
    reducer: {
        editor: editorReducer,
        mdText: mdTextReducer,
        theme: themeReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
