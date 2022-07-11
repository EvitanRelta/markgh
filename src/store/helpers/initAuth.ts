import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { AppStore } from '..'
import { firebaseConfig } from '../../authentication/config/firebaseConfig'

let store!: AppStore
export const _injectStore = (_store: AppStore) => {
    store = _store
}

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)

export { auth, firebaseApp }
