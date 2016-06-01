import React, { Component } from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import style from './style.css'

class Login extends Component {
    render() {
        const { isOpened, status, data } = this.props
        return (
            <div className="container-info-side">
                <div className="right-container">
                <h4>标题</h4>
                <div className="group">
                    <textarea id="doc-title" name="" id="" cols="30" rows="10"></textarea>
                </div>

                <h4>作者</h4>
                <div className="group">
                    <textarea id="doc-author" className="author" name="" id="" cols="30" rows="1"></textarea>
                </div>

                <h4>摘要</h4>
                <div className="group">
                    <textarea id="doc-summary" name="" id="" cols="30" rows="10"></textarea>
                </div>

                <h4>封面</h4>
                <div className="group">
                    <div className="img_fluid add clear">
                        <img src={require("./img/img_add.png")} alt="" />
                        <input type="file" name="file"/>
                    </div>
                </div>
                <div className="footer">
                    <a id="complete" href="javascript:;" className="btn">完成</a>
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
