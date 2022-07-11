import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { AppStore } from '..'
import { firebaseConfig } from '../../authentication/config/firebaseConfig'
import { setHasUserInit, setUser } from '../authSlice'

let store!: AppStore
export const _injectStore = (_store: AppStore) => {
    store = _store
}

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)

// Updates local user data.
onAuthStateChanged(auth, (user) => {
    const { dispatch } = store
    dispatch(setUser(user))
})

// Signal that the user has be initialised, then stop listening.
const unsubscribeInitListener = onAuthStateChanged(auth, () => {
    const { dispatch } = store
    dispatch(setHasUserInit(true))
    unsubscribeInitListener()
})

export { auth, firebaseApp }
