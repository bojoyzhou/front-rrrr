import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.less'

class Header extends Component {
    componentDidMount() {
         const { actions } = this.props
         actions.getUserName()
    }
    render() {
        const { actions, username } = this.props
        return (
            <nav className="nav">
                <a href="/" className="logo"><div className="ir"></div><div className="text">八爪云内容服务平台<br/><span>www.i8za.com</span></div></a>
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
                {
                    (() => {
                        if (username) {
                            return (<span>欢迎<a className="username">{username}</a></span>)
                        }else{
                            return (<a onClick={() => actions.openLoginDialog()} className="login" href="javascript:;">登录</a>)
                        }
                    })()
                } |
                    <a className="home" href="/">home</a>
                </div>
            </nav>
        )
    }
}
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../actions'
function mapStateToProps(state) {
    return {
        username: state.login.username
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
