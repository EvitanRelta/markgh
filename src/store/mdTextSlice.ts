import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const mdTextSlice = createSlice({
    name: 'mdText',
    initialState: '',
    reducers: {
        setMdText(state, actions: PayloadAction<string>) {
            return actions.payload
        },
    },
})

export const { setMdText } = mdTextSlice.actions
export const mdTextReducer = mdTextSlice.reducer
