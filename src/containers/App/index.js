
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import style from './style.css'

import Header from '../../components/Header'
import Editor from '../../components/Editor'
import DevTools from '../DevTools';

class App extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                {this.props.children}
                <DevTools></DevTools>
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
