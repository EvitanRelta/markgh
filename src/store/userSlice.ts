import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { Auth, getAuth, User } from 'firebase/auth'
import firebaseConfig from '../components/Authentication/config/firebaseConfig'

interface UserStatus {
    loggedIn: boolean
    info: User | null
    auth: Auth
    firebaseApp: FirebaseApp
}

//Initialises firebase for authentication
const firebaseApp = initializeApp(firebaseConfig)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        info: null,
        auth: getAuth(firebaseApp),
        firebaseApp,
    } as UserStatus,
    reducers: {
        loginUser(state, action: PayloadAction<User>) {
            return {
                ...state,
                loggedIn: true,
                info: action.payload,
            }
        },
        logoutUser(state) {
            return {
                ...state,
                loggedIn: false,
                info: null,
            }
        },
    },
})

export const { loginUser, logoutUser } = userSlice.actions
export const userReducer = userSlice.reducer
