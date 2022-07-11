import { AppStore } from '..'
import { _injectStore as authInjectStore } from './initAuth'
import { _injectStore as editorInjectStore } from './initEditor'

// 'injectStore' code source:
// https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
export const injectStore = (store: AppStore) => {
    authInjectStore(store)
    editorInjectStore(store)
}
