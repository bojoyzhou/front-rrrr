import React, { Component } from 'react'
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
    constructor(props, context){
        super(props, context)
        this.onClickLogin = this.onClickLogin.bind(this)
        this.onClickClose = this.onClickClose.bind(this)
        this.login = this.login.bind(this)
        this.state ={
            showLogin: false
        }
    }
    onClickLogin() {
        this.setState(Object.assign({}, this.state, {
            showLogin: true
        }))
    }
    onClickClose() {
        this.setState(Object.assign({}, this.state, {
            showLogin: false
        }))
    }
    login(data) {
        const { actions } = this.props
        actions.userLogin(data)
    }
    render() {
        const { username } = this.props
        const { showLogin } = this.state
        return (
            <div data-reactroot>
                <Header onClickLogin={this.onClickLogin}></Header>
                {this.props.children}
                { showLogin ? <Login
                    isLogin = {!!username }
                    close = { this.onClickClose }
                    login = { this.login }
                    > </Login> : null
                }
            </div>
        )
    }
}

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../actions'
function mapStateToProps(state) {
    return {
        username: state.user.username
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
