import React, { Component } from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import { VelocityComponent } from 'velocity-react'
import velocityUi from '../../utils/velocity.ui.js'
import style from './style.less'
import { LOGIN_DIALOG, REGIST_DIALOG, FORGOT_DIALOG, REGIST_DIALOG_1, REGIST_DIALOG_2 } from '../../constants'

class Login extends Component {
    handleRegist() {
        const {actions} = this.props
        actions.openRegistDialog()
        return false
    }
    handleLogin() {
        const {actions} = this.props
        actions.openLoginDialog()
        return false
    }
    handleChange(name, value) {
        const {actions} = this.props
        actions.loginDataChange({name, value})
    }
    doLogin() {
        const {actions, data} = this.props
        this.checkData('doLogin', data, actions.showPrompt, () => {
            actions.doLogin({
                hook: (result) => {
                    if(result.ret_code !== 0){
                        actions.showPrompt(result.ret_desc)
                        return false
                    }else{
                        this.hide()
                    }
                }
            })
        })
    }
    doRegist() {
        const {actions, step, data} = this.props
        if(step == REGIST_DIALOG_1){
            this.checkData('doRegistPre', data, actions.showPrompt, () => {
                actions.registNext()
            })
        }else if(step == REGIST_DIALOG_2){
            this.checkData('doRegist', data, actions.showPrompt, () => {
                actions.doRegist({
                    hook: (result) => {
                        if(result.ret_code !== 0){
                            actions.showPrompt(result.ret_desc)
                            return false
                        }
                    }
                })
            })
        }
    }
    close() {
        const {actions} = this.props
        actions.closeLoginDialog()
    }
    checkData(type, {username, email, password, repassword, vcode}, showPrompt, cb) {
        switch(type){
            case 'doLogin':
                if(email == ''){
                    showPrompt('邮箱不能为空')
                    return false
                }else if(password == ''){
                    showPrompt('密码不能为空')
                    return false
                }else if(vcode.length !== 4){
                    showPrompt('验证码不正确')
                }
                return cb()
            case 'doRegistPre':
                if(email == ''){
                    showPrompt('邮箱不能为空')
                    return false
                }else if(vcode.length !== 4){
                    showPrompt('验证码不正确')
                }
                return this.checkVcode(vcode, cb, showPrompt)
            case 'doRegist':
                if(username == ''){
                    showPrompt('昵称不能为空')
                    return false
                }else if(password == ''){
                    showPrompt('密码不能为空')
                    return false
                }else if(password !== repassword){
                    showPrompt('两次密码不一致')
                    return false
                }
                return cb()
        }
        return true
    }
    checkVcode(vcode, cb, showPrompt) {
        const {actions} = this.props
        actions.checkVcode({
            vcode,
            hook: (result) => {
                if(result.result){
                    cb()
                }else{
                    showPrompt('验证码不正确')
                }
                return false
            }
        })
    }
    changeVcode() {
        const {actions} = this.props
        actions.changeVcode()
    }
    hide() {
        const {isOpened, display, actions} = this.props
        console.log(isOpened, display)
        if(!isOpened && display == 'block'){
            actions.hideLoginPanelDelay()
        }
    }
    render() {
        const { isOpened, display, status, data, step, codelink } = this.props
        const animation = isOpened ? "transition.bounceDownIn" : "transition.flipBounceYOut"
        return (
            <div className="container-login" style={{ display }}>
                <div className="mask">
                    <VelocityComponent animation={animation} complete={this.hide.bind(this)}>
                        <div className={"mask-panel " + status.toLowerCase()}>
                            {
                                (function(){
                                    if(status == LOGIN_DIALOG){
                                        return (
                                            <div className="mask-title clear">
                                                <h4>登录</h4>
                                                <span>还没有账号？<a onClick={this.handleRegist.bind(this)}>立即注册</a></span>
                                                <a onClick={this.close.bind(this)} className="close">&times;</a>
                                            </div>
                                        )
                                    }else if(status == REGIST_DIALOG){
                                        return (
                                            <div className="mask-title clear">
                                                <h4>注册</h4>
                                                <span>已有账号，<a onClick={this.handleLogin.bind(this)}>直接登录</a></span>
                                                <a onClick={this.close.bind(this)} href="javascript:;" className="close">&times;</a>
                                            </div>
                                        )
                                    }
                                }).call(this)
                            }

                            <div className="mask-body clear">
                                <div className="form login-form" style={{ display: status == LOGIN_DIALOG ? "block" : "none"}}>
                                    <label className="email">
                                        <input type="text" onChange={(e) => this.handleChange('email', e.target.value)} value={data.email} placeholder="请输入您的用户名" />
                                    </label>
                                    <label className="password">
                                        <input type="password" onChange={(e) => this.handleChange('password', e.target.value)} value={data.password} placeholder="请输入您的密码" />
                                    </label>
                                    <label className="vcode">
                                        <input type="text" onChange={(e) => this.handleChange('vcode', e.target.value)} value={data.vcode} placeholder="请输入验证码" />
                                        <img className="vcode-img" onClick={this.changeVcode.bind(this)} src={codelink} alt=""/>
                                    </label>
                                </div>
                                <div className="form regist-form" style={{ display: status == REGIST_DIALOG ? "block" : "none"}}>
                                    <div className="step-1" style={{ display: step == REGIST_DIALOG_1 ? "block" : "none"}}>
                                        <label className="email">
                                            <input type="text" onChange={(e) => this.handleChange('email', e.target.value)} value={data.email} placeholder="请输入您的常用邮箱" />
                                        </label>
                                        <label className="vcode">
                                            <input type="text" onChange={(e) => this.handleChange('vcode', e.target.value)} value={data.vcode} placeholder="请输入验证码" />
                                            <img className="vcode-img" onClick={this.changeVcode.bind(this)} src={codelink} alt=""/>
                                        </label>
                                    </div>
                                    <div className="step-2" style={{ display: step == REGIST_DIALOG_2 ? "block" : "none"}}>
                                        <label className="username">
                                            <input type="text" onChange={(e) => this.handleChange('uname', e.target.value)} value={data.uname} placeholder="请输入您的昵称" />
                                        </label>
                                        <label className="password">
                                            <input type="password" onChange={(e) => this.handleChange('password', e.target.value)} value={data.password} placeholder="请输入您的密码" />
                                        </label>
                                        <label className="password">
                                            <input type="password" onChange={(e) => this.handleChange('repassword', e.target.value)} value={data.repassword} placeholder="请再次输入您的密码" />
                                        </label>
                                    </div>
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
                                <button onClick={this.doRegist.bind(this)} className="btn btn-block">
                                    {
                                        step == REGIST_DIALOG_1 ? '下一步' : '注册'
                                    }
                                </button>
                            </div>
                        </div>
                    </VelocityComponent>
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
        display: state.login.display,
        status: state.login.status,
        step: state.login.step,
        codelink: state.login.codelink,
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
