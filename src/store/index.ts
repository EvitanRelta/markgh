import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './authSlice'
import { editorReducer } from './editorSlice'
import { mdTextReducer } from './mdTextSlice'
import { themeReducer } from './themeSlice'

export const store = configureStore({
    reducer: {
        editor: editorReducer,
        mdText: mdTextReducer,
        theme: themeReducer,
        auth: authReducer,
    },
    // Ignore Redux's non-serializable error.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['auth/setUser', 'auth/setGhToken'],
                ignoredPaths: ['editor.editor', 'auth'],
            },
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
