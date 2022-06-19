import { createSlice } from '@reduxjs/toolkit'

const mdTextSlice = createSlice({
    name: 'mdText',
    initialState: '',
    reducers: {
        setMdText(state, actions) {
            return actions.payload
        },
    },
})

export const { setMdText } = mdTextSlice.actions
export const mdTextReducer = mdTextSlice.reducer
