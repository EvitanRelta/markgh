import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { AppStore } from '..'
import { firebaseConfig } from '../../authentication/config/firebaseConfig'
import { setUser } from '../authSlice'

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

export { auth, firebaseApp }
