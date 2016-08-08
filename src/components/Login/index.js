import React, { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import style from './style.less'

class Login extends Component {
    constructor(props, context) {
        super(props, context)
        this.keydown = this.keydown.bind(this)
        this.change = this.change.bind(this)
        this.dologin = this.dologin.bind(this)

        this.state = {
            codelink: '/api/vcode'
        }
    }
    keydown(e) {
        if (e.keyCode == 13) {
            this.dologin()
        }
    }
    change() {
        this.setState(Object.assign({}, this.state, {
            codelink: '/api/vcode?t=' + Date.now()
        }))
    }
    dologin(){
        const email = this.refs.email.value
        const pwd = this.refs.pwd.value
        const vcode = this.refs.vcode.value
        const remember = this.refs.remember.checked
        const autologin = this.refs.autologin.checked
        const data = {
            email,
            pwd,
            vcode,
            remember,
            autologin
        }
        this.props.login(data)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.isLogin){
            // this.props.close()
        }
    }
    render() {
        const { codelink } = this.state
        return (
            <div onKeyDown={ this.keydown } className="container-login">
                <div className="mask">
                    <div className={"mask-panel"}>
                        <div className="mask-title clear">
                            <h4>登录</h4>
                            <span>还没有账号？<a href="/user/reg">立即注册</a></span>
                            <a onClick={ this.props.close } className="close">&times;</a>
                        </div>
                        <div className="mask-body clear">
                            <div className="form login-form">
                                <label className="email">
                                    <input ref="email" type="text" placeholder="请输入您的用户名" />
                                </label>
                                <label className="password">
                                    <input ref="pwd" type="password" placeholder="请输入您的密码" />
                                </label>
                                <label className="vcode">
                                    <input ref="vcode" type="text" placeholder="请输入验证码" />
                                    <img onClick={ this.change } className="vcode-img" src={codelink} alt=""/>
                                </label>
                            </div>
                            <div className="form-tail">
                                <label for="remember">
                                    <input ref="remember" type="checkbox" />记住密码
                                </label>
                                <label for="autologin">
                                    <input ref="autologin" type="checkbox" />自动登录
                                </label>
                            </div>
                        </div>
                        <div className="mask-footer">
                            <button onClick={ this.dologin } className="btn btn-block">登录</button>
                            <a href="/user/forget">忘记密码</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    close: PropTypes.func.isRequired,
    isLogin: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
}

export default Login
