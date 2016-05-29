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

export default function configure(initialState) {
    const store = createStore(rootReducer, enhancer, applyMiddleware(thunk), initialState);

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers')
            store.replaceReducer(nextReducer)
        })
    }

    return store
}
