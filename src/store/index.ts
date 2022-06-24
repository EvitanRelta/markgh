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
    // Ignore Redux's non-serializable error.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: ['editor.editor'],
            },
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
