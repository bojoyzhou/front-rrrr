import React, { Component } from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import FileUpload from 'react-fileupload'
import Qrcode from '../Qrcode'

import style from './style.less'

import { VelocityComponent, velocityHelpers } from 'velocity-react'
import velocityUi from '../../utils/velocity.ui.js'

class InfoSide extends Component {
    handleChange (name, value){
        const {actions} = this.props
        actions.changeSideInfo({
            name,
            value
        })
    }
    saveContent() {
        const {actions, title, author, summary, cover, ue} = this.props
        const that = this
        if(!title){
            return actions.showPrompt('标题不能为空')
        }else if(!author){
            return actions.showPrompt('作者不能为空')
        }else if(!summary){
            return actions.showPrompt('简介不能为空')
        }else if(!cover){
            return actions.showPrompt('请上传一张封面')
        }else if(!ue.getContent()){
            return actions.showPrompt('您没有编辑的内容')
        }
        actions.saveContent({
            hook: (result) => {
                if(result.ret_code == 0){
                    actions.preView(result.docid)
                }else if(result.ret_code == 3){
                    actions.openLoginDialog({
                        complete: (result) => {
                            that.saveContent()
                        }
                    })
                }else{
                    actions.showPrompt(result.ret_desc)
                }
                return false
            }
        })
    }
    updateDimensions() {
        const {actions} = this.props
        const width = document.body.offsetWidth
        if(width > 1550){
            actions.showSide()
        }else{
            actions.hideSide()
        }
    }
    componentWillMount() {
        this.updateDimensions();
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }
    handleClick(){
        const {actions, showSide} = this.props
        if(showSide){
            actions.hideSide()
        }else{
            actions.showSide()
        }
    }
    checkLogin(e){
        const {isLogin, actions} = this.props
        if(!isLogin){
            actions.openLoginDialog()
            e.stopPropagation()
            return false
        }
    }
    render() {
        const actions = this.props.actions
        const {title, author, summary, cover, showSide, isLogin} = this.props
        const options = {
            baseUrl : 'http://imgs.8zcloud.com/getfiles.php?thumb=100_0',
            chooseAndUpload : true,
            wrapperDisplay : 'block',
            multiple: true,
            dataType : 'json',
            fileFieldName : 'file',
            beforeChoose: function(){
                if(!isLogin){
                    actions.openLoginDialog()
                    return false
                }
            },
            uploadSuccess: function(result){
                actions.selectCover(result.data.url)
            }
        }
        const handleChange = this.handleChange.bind(this)
        const In = {
            translateX: 0,
            backgroundColor: "#fff"
        }
        const Out = {
            translateX: 271,
            backgroundColor: "#333"
        }
        const animation = showSide ? In : Out
        return (
            <VelocityComponent animation={animation}>
                <div className="container-info-side">
                    {showSide?
                        <div className="fold"  onClick={this.handleClick.bind(this)}>&gt;&gt;</div>
                    :
                        <div className="publish" onClick={this.handleClick.bind(this)}>
                            <div className="icon"></div>
                            发<br/>布
                        </div>
                    }

                    <div className="right-container">
                        <div className="group clear">
                            <h4>标题</h4>
                            <input onChange={ (e) => handleChange('title', e.target.value)} value={title} />
                        </div>

                        <div className="group clear">
                            <h4>作者</h4>
                            <input onChange={ (e) => handleChange('author', e.target.value)} value={author} className="author" />
                        </div>

                        <h4>封面</h4>
                        <div className="group clear">
                            <div className="img_fluid add clear" onClick={(e) => {this.checkLogin(e)}}>
                                <img src={cover ? cover : require("./img/img_add.png")} alt="" />
                                <FileUpload className="img-file" options={options}></FileUpload>
                            </div>
                        </div>

                        <h4>摘要</h4>
                        <div className="group clear">
                            <textarea onChange={ (e) => handleChange('summary', e.target.value)} value={summary} cols="30" rows="10"></textarea>
                        </div>
                        <div className="footer">
                            <a onClick={this.saveContent.bind(this)} href="javascript:;" className="btn">完成</a>
                        </div>
                    </div>
                </div>
            </VelocityComponent>
        )
    }
}

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../actions'
function mapStateToProps(state) {
    return {
        title: state.textArea.title,
        author: state.textArea.author,
        summary: state.textArea.summary,
        cover: state.textArea.cover,
        showSide: state.textArea.showSide,
        ue: state.textArea.ue,
        isLogin: state.login.isLogin
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
)(InfoSide)
