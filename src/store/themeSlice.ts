import { createSlice } from '@reduxjs/toolkit'

type State = 'light' | 'dark'

const themeSlice = createSlice({
    name: 'theme',
    initialState: (localStorage['theme'] || 'light') as State,
    reducers: {
        toggleTheme(state) {
            switch (state) {
                case 'light':
                    localStorage['theme'] = 'dark'
                    return 'dark'
                case 'dark':
                    localStorage['theme'] = 'light'
                    return 'light'
            }
        },
    },
})

export const { toggleTheme } = themeSlice.actions
export const themeReducer = themeSlice.reducer
