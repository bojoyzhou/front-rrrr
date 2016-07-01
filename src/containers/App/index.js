
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import style from './style.less'

import Header from '../../components/Header'
import Editor from '../../components/Editor'
import Login from '../../components/Login'
import InfoSide from '../../components/InfoSide'
import Prompt from '../../components/Prompt'
import Qrcode from '../../components/Qrcode'
import Loading from '../../components/Loading'
import DevTools from '../DevTools'

class App extends Component {
    render() {
        return (
            <div data-reactroot>
                <Header></Header>
                {this.props.children}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return { }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
