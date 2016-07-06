import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import style from './style.less'
import Login from '../Login'
import Animate from 'rc-animate'

class Header extends Component {
    constructor(props, context){
        super(props, context)
    }
    componentDidMount() {
        const { actions } = this.props
        actions.getUserName()
    }
    render() {
        const { actions, username } = this.props
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
                    { username ? <span>欢迎<a className="username">{ username }</a></span> : <a onClick={ this.props.onClickLogin } className="login" href="javascript:;">登录</a> } |
                        <a className="home" href="/">home</a>
                    </div>
                </nav>
            </div>
        )
    }
}

Header.propTypes = {
    onClickLogin: PropTypes.func.isRequired
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
