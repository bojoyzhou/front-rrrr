import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import style from './style.css'
import { LOGIN_DIALOG, REGIST_DIALOG, FORGOT_DIALOG } from '../../constants'

class Login extends Component {
    render() {
        const { isOpened, status, data } = this.props
        return (
            <div className="container-login" style={{ display: isOpened ? "block" : "none"}}>
                <div className="mask">
                    <div className="mask-panel">
                        <div className="mask-title clear">
                            <h4>登录</h4>
                            <span>还没有账号？<a href="#">立即注册</a></span>
                        </div>
                        <div className="mask-body clear">
                            <div className="form login-form">
                                <label className="username">
                                    <input type="text" name="username" placeholder="请输入您的用户名" />
                                </label>
                                <label className="password">
                                    <input type="password" name="password" placeholder="请输入您的密码" />
                                </label>
                            </div>
                            <div className="form regist-form" style={{display:'none'}}>
                                <label className="email">
                                    <input type="text" name="email" placeholder="请输入您的常用邮箱" />
                                </label>
                                <label className="password">
                                    <input type="password" name="password" placeholder="请输入您的密码" />
                                </label>
                                <label className="password">
                                    <input type="password" name="repassword" placeholder="请再次输入您的密码" />
                                </label>
                                <label className="vcode">
                                    <input type="text" name="vcode" placeholder="请输入验证码" />
                                </label>
                            </div>
                            <div className="form-tail">
                                <label for="remember">
                                    <input type="checkbox" id="remember" />记住密码
                                </label>
                                <label for="autologin">
                                    <input type="checkbox" id="autologin" />自动登录
                                </label>
                            </div>
                        </div>
                        <div className="mask-footer">
                            <button className="btn btn-block">登录</button>
                            <a href="">忘记密码</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isOpened: state.login.isOpened,
        status: state.login.status,
        data: state.login.data
    }
}

function mapDispatchToProps(dispatch) {
    return { }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
