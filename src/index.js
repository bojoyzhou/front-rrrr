
import { Router, Route, IndexRoute, Redirect } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import { history } from './utils'

import App from './containers/App'
import Editor from './components/Editor'
import Import from './components/Import'
import Common from './components/Common'
import CommonItem from './components/CommonItem'
import Images from './components/Images'
import Document from './components/Document'
import configure from './store'

const store = configure()
const myHistory = syncHistoryWithStore(history, store)
ReactDOM.render(
    <Provider store={store}>
        <Router history={myHistory}>
            <Redirect from="/" to="/editor/common/0"/>
            <Redirect from="/editor" to="/editor/common/0"/>
            <Route path="/" component={App}>
                <Route path="/editor" component={Editor}>
                    <Route path="/editor/import" component={Import}>
                    </Route>
                    <Route path="/editor/common" component={Common}>
                        <Route path="/editor/common/:id" component={CommonItem}>
                        </Route>
                    </Route>
                    <Route path="/editor/images" component={Images}>
                    </Route>
                </Route>
                <Route path="/document" component={Document}>
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)
