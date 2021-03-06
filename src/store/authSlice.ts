import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosInstance } from 'axios'
import { FirebaseApp } from 'firebase/app'
import { Auth, GithubAuthProvider, signInWithPopup, User } from 'firebase/auth'
import { AppThunkApiConfig } from '.'
import { githubProvider } from '../authentication/config/authMethod'
import { auth, firebaseApp } from './helpers/initAuth'

interface AuthState {
    hasUserInit: boolean
    loggedIn: boolean
    user: User | null
    auth: Auth
    firebaseApp: FirebaseApp
    githubProvider: GithubAuthProvider
    axios: AxiosInstance
}

//Initialises firebase for authentication
const axiosInstance = localStorage['ghToken']
    ? axios.create({
          headers: {
              authorization: 'Bearer ' + localStorage['ghToken'],
          },
      })
    : axios.create()

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        hasUserInit: false,
        loggedIn: false,
        user: null,
        auth,
        firebaseApp,
        githubProvider,
        axios: axiosInstance,
    } as AuthState,
    reducers: {
        setHasUserInit(state, action: PayloadAction<boolean>) {
            state.hasUserInit = action.payload
        },
        setUser(state, action: PayloadAction<User | null>) {
            state.loggedIn = action.payload !== null
            state.user = action.payload
        },
        setGhToken(state, action: PayloadAction<string | null>) {
            const headers = state.axios.defaults.headers
            if (!action.payload) delete headers.common.authorization
            else
                headers.common = {
                    ...headers.common,
                    authorization: 'Bearer ' + action.payload,
                }
        },
    },
})

export const loginUser = createAsyncThunk<void, undefined, AppThunkApiConfig>(
    'auth/loginUser',
    async (_, { getState, dispatch, rejectWithValue }) => {
        const { auth, githubProvider } = getState().auth
        try {
            const signInResult = await signInWithPopup(auth, githubProvider)
            const credential = GithubAuthProvider.credentialFromResult(signInResult)

            if (!credential) return rejectWithValue('Null credentials.')

            const ghToken = credential.accessToken as string
            localStorage['ghToken'] = ghToken

            dispatch(setGhToken(ghToken))
            dispatch(setUser(signInResult.user))
        } catch (e) {
            return rejectWithValue(e as Error)
        }
    }
)

export const logoutUser = createAsyncThunk<void, undefined, AppThunkApiConfig>(
    'auth/logoutUser',
    async (_, { getState, dispatch }) => {
        const { auth } = getState().auth
        delete localStorage['ghToken']
        dispatch(setGhToken(null))
        await auth.signOut()
        return
    }
)

export const { setHasUserInit, setUser, setGhToken } = authSlice.actions
export const authReducer = authSlice.reducer
