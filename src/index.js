import { Router, Route, IndexRoute, Redirect } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import { history } from './utils'

import App from './containers/App'
import Editor from './components/Editor'
import configure from './store'

const store = configure()
const myHistory = syncHistoryWithStore(history, store)
ReactDOM.render(
    <Provider store={store}>
        <Router history={myHistory}>
            <Redirect from="/" to="/editor/common/0"/>
            <Redirect from="/editor" to="/editor/common/0"/>
            <Route path="/editor/import" component={Editor} myRoute="Import">
            </Route>
            <Route path="/editor/common/:id" component={Editor} myRoute="Common">
            </Route>
            <Route path="/editor/images" component={Editor} myRoute="Images">
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)
