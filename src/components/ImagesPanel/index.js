import React, { Component } from 'react'
import { Link } from 'react-router'
import FileUpload from 'react-fileupload'

import ImageFluid from '../ImageFluid'
import NetImage from '../NetImage'
import style from './style.less'

class ImagesPanel extends Component {
    handleCancel() {console.log(Date.now())
        const actions = this.props.actions
        actions.selectPicCancel()
    }
    handleConfirm() {
        const actions = this.props.actions
        actions.selectPicConfirm()
    }
    switchTo(type) {
        const actions = this.props.actions
        if(type == 'local'){
            actions.switchLocal()
        }else if(type == 'network'){
            actions.switchNetwork()
        }
    }
    render() {
        const { selectPics, type } = this.props
        return (
            <div className="container-images-panel open">
                <div className="mask">
                    <div className="mask-panel">
                        <div className="mask-title">
                            <h4>图片上传</h4>
                        </div>
                        <div className="mask-body">
                            <div className="tabs clear">
                                <a className={ type == "local" ? "active" : ""} onClick={() => {this.switchTo('local')}} href="javascript:;">本地上传</a>
                                <a className={ type == "network" ? "active" : ""} onClick={() => {this.switchTo('network')}} href="javascript:;">网络图片上传</a>
                            </div>
                            <div className="tabs-content">
                                { type == "local" ? this.local() : this.network() }
                            </div>
                        </div>
                        <div className="mask-footer">
                            <div className="mask-info"><span className="num-pic">{selectPics.filter((pic) => pic.picked).length}</span>张图片已经被选中</div>
                            <div className="mask-btn">
                                <button onClick={this.handleCancel.bind(this)} className="btn cancel">取消</button>
                                <button onClick={this.handleConfirm.bind(this)} className="btn confirm">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    local() {
        const actions = this.props.actions
        const options = {
            baseUrl : 'http://imgs.8zcloud.com/getfiles.php?thumb=100_0',
            chooseAndUpload : true,
            wrapperDisplay : 'inline-block',
            multiple: true,
            dataType : 'json',
            accept: 'image/*',
            fileFieldName : 'file',
            beforeUpload: function(files){
                // for (var i = files.length - 1; i >= 0; i--) {
                //     files[i].filedName = 'file'
                // }
            },
            uploadSuccess: function(result){
                actions.selectPic(result.data)
            }
        }
        return (
            <ImageFluid>
                <div className="add">
                    <img src={require("./img/img_add.png")} alt="" />
                    <FileUpload className="img-file" options={options}></FileUpload>
                </div>
            </ImageFluid>
        )
    }
    network() {
        return (
            <NetImage />
        )
    }
}
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../actions'
function mapStateToProps(state) {
    return {
        selectPics: state.selectPic.selectPics,
        type: state.selectPic.type
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
)(ImagesPanel)
