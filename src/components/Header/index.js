import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.less'
import Login from '../Login'
import Animate from 'rc-animate'

class Header extends Component {
    constructor(props, context){
        super(props, context)
        this.onClickLogin = this.onClickLogin.bind(this)
        this.onClickClose = this.onClickClose.bind(this)
        this.login = this.login.bind(this)
        this.state ={
            showLogin: false
        }
    }
    componentDidMount() {
        const { actions } = this.props
        actions.getUserName()
    }
    onClickLogin(){
        this.setState(Object.assign({}, this.state, {
            showLogin: true
        }))
    }
    onClickClose(){
        this.setState(Object.assign({}, this.state, {
            showLogin: false
        }))
    }
    login(data){
        const { actions } = this.props
        actions.userLogin(data)
    }
    render() {
        const { actions, username } = this.props
        const { showLogin } = this.state
        return (
            <div>
                <nav className="nav">
                    <a href="/" className="logoall">
                        <img src={require("./img/logo_all.png")} />
                    </a>
                    <ul className="nav-ul clear">
                        <li className="nav-item nav-item-editor nav-active">
                            <Link className="nav-link" to="/editor">
                                <div className="icon"></div>
                                <div className="desc">
                                    <i></i>
                                    <span>编辑器</span>
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item nav-item-doc">
                            <a className="nav-link" href="/content/index">
                                <div className="icon"></div>
                                <div className="desc">
                                    <i></i>
                                    <span>内容库</span>
                                </div>
                            </a>
                        </li>
                        <li className="nav-item nav-item-manage">
                            <a href="/"></a>
                            <a className="nav-link" href="/usergrabwords/index">
                                <div className="icon"></div>
                                <div className="desc">
                                    <i></i>
                                    <span>管理中心</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div className="right">
                    { username ? <span>欢迎<a className="username">{ username }</a></span> : <a onClick={ this.onClickLogin } className="login" href="javascript:;">登录</a> } |
                        <a className="home" href="/">home</a>
                    </div>
                </nav>
                { showLogin ? <Login isLogin={ !!username } close={ this.onClickClose } login={ this.login }></Login> : null }
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
)(Header)
