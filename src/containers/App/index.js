
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

class App extends Component {
    render() {
        return (
            <div data-reactroot>
                <Header></Header>
                {this.props.children}
                <InfoSide></InfoSide>
                <Login></Login>
                <Prompt></Prompt>
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
