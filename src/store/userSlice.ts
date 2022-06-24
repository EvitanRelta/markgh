import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosInstance } from 'axios'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { Auth, getAuth, GithubAuthProvider, signInWithPopup, User } from 'firebase/auth'
import { AppDispatch, RootState } from '.'
import { githubProvider } from '../authentication/config/authMethod'
import firebaseConfig from '../authentication/config/firebaseConfig'

interface UserState {
    loggedIn: boolean
    user: User | null
    auth: Auth
    firebaseApp: FirebaseApp
    githubProvider: GithubAuthProvider
    axios: AxiosInstance
}

//Initialises firebase for authentication
const firebaseApp = initializeApp(firebaseConfig)
const axiosInstance = localStorage['ghToken']
    ? axios.create({
          headers: {
              authorization: 'Bearer ' + localStorage['ghToken'],
          },
      })
    : axios.create()

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        user: null,
        auth: getAuth(firebaseApp),
        firebaseApp,
        githubProvider,
        axios: axiosInstance,
    } as UserState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            return {
                ...state,
                loggedIn: action.payload !== null,
                user: action.payload,
            }
        },
        setGhToken(state, action: PayloadAction<string | null>) {
            const headers = state.axios.defaults.headers
            if (!action.payload) delete headers.common.authorization
            else
                headers.common = {
                    ...headers.common,
                    authorization: 'Bearer ' + action.payload,
                }
            return state
        },
    },
    extraReducers: (builder) => {
        // // Add reducers for additional action types here, and handle loading state as needed
        // builder.addCase(loginUser.fulfilled, (state, action) => {
        //     // Add user to the state array
        //     state.entities.push(action.payload)
        // })
    },
})

interface UserThunkApiConfig {
    dispatch: AppDispatch
    state: RootState
}

export const loginUser = createAsyncThunk<void, undefined, UserThunkApiConfig>(
    'user/loginUser',
    async (_, { getState, dispatch, rejectWithValue }) => {
        const { axios, auth, githubProvider } = getState().user
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

export const logoutUser = createAsyncThunk<void, undefined, UserThunkApiConfig>(
    'user/logoutUser',
    async (_, { getState, dispatch }) => {
        const { auth } = getState().user
        delete localStorage['ghToken']
        dispatch(setGhToken(null))
        await auth.signOut()
        return
    }
)

export const { setUser, setGhToken } = userSlice.actions
export const userReducer = userSlice.reducer
