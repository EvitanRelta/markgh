import { configureStore } from '@reduxjs/toolkit'
import { editorReducer } from './editorSlice'
import { mdTextReducer } from './mdTextSlice'
import { themeReducer } from './themeSlice'
import { userReducer } from './userSlice'

export const store = configureStore({
    reducer: {
        editor: editorReducer,
        mdText: mdTextReducer,
        theme: themeReducer,
        user: userReducer,
    },
    // Ignore Redux's non-serializable error.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['user/setUser', 'user/setGhToken'],
                ignoredPaths: ['editor.editor', 'user'],
            },
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
