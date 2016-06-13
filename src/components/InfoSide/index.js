import React, { Component } from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import FileUpload from 'react-fileupload'
import Qrcode from '../Qrcode'

import style from './style.less'

class InfoSide extends Component {
    handleChange (name, value){
        const {actions} = this.props
        actions.changeSideInfo({
            name,
            value
        })
    }
    saveContent() {
        const {actions} = this.props
        const that = this
        actions.saveContent({
            hook: (result) => {
                if(result.ret_code == 0){
                    actions.preView(result.docid)
                }else if(result.ret_code == 3){
                    actions.openLoginDialog({
                        hook: (result) => {
                            console.log(result)
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
    render() {
        const actions = this.props.actions
        const options = {
            baseUrl : 'http://imgs.8zcloud.com/getfiles.php?thumb=100_0',
            chooseAndUpload : true,
            wrapperDisplay : 'inline-block',
            multiple: true,
            dataType : 'json',
            fileFieldName : 'filedName',
            beforeUpload: function(files){
                for (var i = files.length - 1; i >= 0; i--) {
                    files[i].filedName = 'file'
                }
            },
            uploadSuccess: function(result){
                actions.selectCover(result.data.url)
            }
        }
        const {title, author, summary, cover, showSide} = this.props
        const handleChange = this.handleChange.bind(this)
        return (
            <div className={showSide ? 'show-side' : 'hide-side'}>
                <div className="black">
                    <div className="publish" onClick={this.handleClick.bind(this)}>
                        <div className="icon"></div>
                        发<br/>布
                    </div>
                </div>
                <div className="container-info-side">
                    <div className="fold"  onClick={this.handleClick.bind(this)}>&gt;&gt;</div>
                    <div className="right-container">
                        <h4>标题</h4>
                        <div className="group">
                            <textarea onChange={ (e) => handleChange('title', e.target.value)} value={title} cols="30" rows="10"></textarea>
                        </div>

                        <h4>作者</h4>
                        <div className="group">
                            <textarea onChange={ (e) => handleChange('author', e.target.value)} value={author} className="author" cols="30" rows="1"></textarea>
                        </div>

                        <h4>摘要</h4>
                        <div className="group">
                            <textarea onChange={ (e) => handleChange('summary', e.target.value)} value={summary} cols="30" rows="10"></textarea>
                        </div>

                        <h4>封面</h4>
                        <div className="group">
                            <div className="img_fluid add clear">
                                <img src={cover ? cover : require("./img/img_add.png")} alt="" />
                                <FileUpload className="img-file" options={options}></FileUpload>
                            </div>
                        </div>
                        <div className="footer">
                            <a onClick={this.saveContent.bind(this)} href="javascript:;" className="btn">完成</a>
                        </div>
                    </div>
                </div>
                <Qrcode></Qrcode>
            </div>
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
        showSide: state.textArea.showSide
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
