import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const markdownTextSlice = createSlice({
    name: 'markdownText',
    initialState: '',
    reducers: {
        setMarkdownText(state, actions: PayloadAction<string>) {
            return actions.payload
        },
    },
})

export const { setMarkdownText } = markdownTextSlice.actions
export const markdownTextReducer = markdownTextSlice.reducer
