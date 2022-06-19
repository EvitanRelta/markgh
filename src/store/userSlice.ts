import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

interface UserStatus {
    loggedIn: boolean
    info: User | null
}

const userSlice = createSlice({
    name: 'user',
    initialState: { loggedIn: false, info: null } as UserStatus,
    reducers: {
        loginUser(state, action: PayloadAction<User>) {
            return { loggedIn: true, info: action.payload }
        },
        logoutUser(state) {
            return { loggedIn: false, info: null }
        },
    },
})

export const { loginUser, logoutUser } = userSlice.actions
export const userReducer = userSlice.reducer
