import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { Auth, getAuth, User } from 'firebase/auth'
import firebaseConfig from '../authentication/config/firebaseConfig'

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
        setUser(state, action: PayloadAction<User | null>) {
            return {
                ...state,
                loggedIn: action.payload !== null,
                user: action.payload,
            }
        },
    },
})

export const { setUser } = userSlice.actions
export const userReducer = userSlice.reducer
