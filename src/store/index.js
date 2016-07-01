import { createStore, applyMiddleware, compose } from 'redux'
import { persistState } from 'redux-devtools';
import * as middleware from '../middleware'
import thunk from 'redux-thunk';

import rootReducer from '../reducers'

import DevTools from '../containers/DevTools';

const enhancer = compose(
    DevTools.instrument(),
    persistState(
        window.location.href.match(
            /[?&]debug_session=([^&#]+)\b/
        )
    )
)
const createStoreWithMiddleware = applyMiddleware(middleware.logger, thunk)(createStore)

const observeStore = store => {
    return (select, onchange) => {
        let currentState = null
        const handleChange = () => {
            let nextState = select(store.getState())
            if (currentState !== nextState) {
                onchange(currentState)
            }
        }
        const unsubscribe = store.subscribe(handleChange)
        handleChange()
        return unsubscribe
    }
}
let _observe = null
export default function configure(initialState) {
    const store = createStoreWithMiddleware(rootReducer, enhancer, initialState);
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers')
            store.replaceReducer(nextReducer)
        })
    }
    _observe = observeStore(store)
    return store
}

export const observe = () => {
    if (!_observe) {
        return
    }
    _observe.apply(this, arguments)
}
