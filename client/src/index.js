import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import './index.css'
import App from './App/App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)))
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
