import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { App } from './App'
import { store } from './store'
import { injectStore } from './store/helpers/injectStore'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)

injectStore(store)
