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
var _store = null
export default function configure(initialState) {
    if(_store){
        return _store
    }
    const store = createStore(rootReducer, enhancer, applyMiddleware(thunk), applyMiddleware(middleware.logger), initialState);
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers')
            store.replaceReducer(nextReducer)
        })
    }

    return _store = store
}
