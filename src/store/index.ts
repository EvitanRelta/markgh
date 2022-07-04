import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './authSlice'
import { dataReducer } from './dataSlice'
import { themeReducer } from './themeSlice'

export const store = configureStore({
    reducer: {
        data: dataReducer,
        theme: themeReducer,
        auth: authReducer,
    },
    // Ignore Redux's non-serializable error.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['auth/setUser', 'auth/setGhToken'],
                ignoredPaths: ['data.editor', 'auth'],
            },
        }),
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export interface AppThunkApiConfig {
    dispatch: AppDispatch
    state: RootState
}
