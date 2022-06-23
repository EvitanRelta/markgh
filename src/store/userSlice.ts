import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { Auth, getAuth, User } from 'firebase/auth'
import firebaseConfig from '../components/Authentication/config/firebaseConfig'

interface UserStatus {
    loggedIn: boolean
    user: User | null
    auth: Auth
    firebaseApp: FirebaseApp
}

//Initialises firebase for authentication
const firebaseApp = initializeApp(firebaseConfig)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        user: null,
        auth: getAuth(firebaseApp),
        firebaseApp,
    } as UserStatus,
    reducers: {
        loginUser(state, action: PayloadAction<User>) {
            return {
                ...state,
                loggedIn: true,
                user: action.payload,
            }
        },
        logoutUser(state) {
            return {
                ...state,
                loggedIn: false,
                user: null,
            }
        },
    },
})

export const { loginUser, logoutUser } = userSlice.actions
export const userReducer = userSlice.reducer
