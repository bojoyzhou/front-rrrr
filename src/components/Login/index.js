import React, { Component } from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import style from './style.css'
import { LOGIN_DIALOG, REGIST_DIALOG, FORGOT_DIALOG } from '../../constants'

class Login extends Component {
    handleRegist() {
        const {actions} = this.props
        actions.openRegistDialog()
    }
    handleLogin() {
        const {actions} = this.props
        actions.openLoginDialog()
    }
    handleChange(name, value) {
        const {actions} = this.props
        actions.loginDataChange({name, value})
    }
    doLogin() {
        const {actions} = this.props
        actions.doLogin()
    }
    doRegist() {
        const {actions} = this.props
        actions.doRegist()
    }
    close() {
        const {actions} = this.props
        actions.closeLoginDialog()
    }
    render() {
        const { isOpened, status, data } = this.props
        return (
            <div className="container-login" style={{ display: isOpened ? "block" : "none"}}>
                <div className="mask">
                    <div className={"mask-panel " + status.toLowerCase()}>
                        {
                            (function(){
                                if(status == LOGIN_DIALOG){
                                    return (
                                        <div className="mask-title clear">
                                            <h4>登录</h4>
                                            <span>还没有账号？<a onClick={this.handleRegist.bind(this)} href="#">立即注册</a></span>
                                            <a onClick={this.close.bind(this)} href="javascript:;" className="close">&times;</a>
                                        </div>
                                    )
                                }else if(status == REGIST_DIALOG){
                                    return (
                                        <div className="mask-title clear">
                                            <h4>注册</h4>
                                            <span>已有账号，<a onClick={this.handleLogin.bind(this)} href="#">直接登录</a></span>
                                            <a onClick={this.close.bind(this)} href="javascript:;" className="close">&times;</a>
                                        </div>
                                    )
                                }
                            }).call(this)
                        }

                        <div className="mask-body clear">
                            <div className="form login-form" style={{ display: status == LOGIN_DIALOG ? "block" : "none"}}>
                                <label className="username">
                                    <input type="text" onChange={(e) => this.handleChange('email', e.target.value)} value={data.email} placeholder="请输入您的用户名" />
                                </label>
                                <label className="password">
                                    <input type="password" onChange={(e) => this.handleChange('password', e.target.value)} value={data.password} placeholder="请输入您的密码" />
                                </label>
                            </div>
                            <div className="form regist-form" style={{ display: status == REGIST_DIALOG ? "block" : "none"}}>
                                <label className="email">
                                    <input type="text" onChange={(e) => this.handleChange('email', e.target.value)} value={data.email} placeholder="请输入您的常用邮箱" />
                                </label>
                                <label className="email">
                                    <input type="text" onChange={(e) => this.handleChange('uname', e.target.value)} value={data.uname} placeholder="请输入您的昵称" />
                                </label>
                                <label className="password">
                                    <input type="password" onChange={(e) => this.handleChange('password', e.target.value)} value={data.password} placeholder="请输入您的密码" />
                                </label>
                                <label className="password">
                                    <input type="password" onChange={(e) => this.handleChange('repassword', e.target.value)} value={data.repassword} placeholder="请再次输入您的密码" />
                                </label>
                                <label className="vcode">
                                    <input type="text" onChange={(e) => this.handleChange('vcode', e.target.value)} value={data.vcode} placeholder="请输入验证码" />
                                </label>
                            </div>
                            <div className="form-tail" style={{ display: status == LOGIN_DIALOG ? "block" : "none"}}>
                                <label for="remember">
                                    <input type="checkbox" />记住密码
                                </label>
                                <label for="autologin">
                                    <input type="checkbox" />自动登录
                                </label>
                            </div>
                        </div>
                        <div className="mask-footer" style={{ display: status == LOGIN_DIALOG ? "block" : "none"}}>
                            <button onClick={this.doLogin.bind(this)} className="btn btn-block">登录</button>
                            <a href="">忘记密码</a>
                        </div>
                        <div className="mask-footer" style={{ display: status == REGIST_DIALOG ? "block" : "none"}}>
                            <button onClick={this.doRegist.bind(this)} className="btn btn-block">注册</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../actions'
function mapStateToProps(state) {
    return {
        isOpened: state.login.isOpened,
        status: state.login.status,
        data: state.login.data
    }
}

function mapDispatchToProps(dispatch) {
    return{
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
