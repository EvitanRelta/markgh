import { createSlice } from '@reduxjs/toolkit'

type State = 'light' | 'dark'

const themeSlice = createSlice({
    name: 'theme',
    initialState: (localStorage['selectedTheme'] || 'light') as State,
    reducers: {
        toggleTheme(state) {
            switch (state) {
                case 'light':
                    return 'dark'
                case 'dark':
                    return 'light'
            }
        },
    },
})

export const { toggleTheme } = themeSlice.actions
export const themeReducer = themeSlice.reducer
