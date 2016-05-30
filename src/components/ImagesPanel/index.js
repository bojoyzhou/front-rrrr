import React, { Component } from 'react'
import { Link } from 'react-router'
import FileUpload from 'react-fileupload'

import ImageFluid from '../ImageFluid'
import style from './style.css'

class ImagesPanel extends Component {
    handleCancel() {
        const actions = this.props.actions
        actions.selectPicCancel()
    }
    handleConfirm() {
        const actions = this.props.actions
        actions.selectPicConfirm()
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
                actions.uploadPic(result.data)
            }
        }
        const selectPics = this.props.selectPics
        return (
            <div className="container-images-panel">
                <div className="mask">
                    <div className="mask-panel">
                        <div className="mask-title">
                            <h4>图片上传</h4>
                        </div>
                        <div className="mask-body">
                            <div className="tabs clear">
                                <a className="active" href="#">本地上传</a>
                                <a href="#">网络图片上传</a>
                            </div>
                            <div className="tabs-content">
                                <ImageFluid pics={selectPics}>
                                    <div className="img_fluid add">
                                        <img src={require("./img/img_add.png")} alt="" />
                                        <FileUpload className="img-file" options={options}></FileUpload>
                                    </div>
                                </ImageFluid>
                            </div>
                        </div>
                        <div className="mask-footer">
                            <div className="mask-info"><span className="num-pic">16</span>张图片已经被选中</div>
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
}
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../actions'
function mapStateToProps(state) {
    return {
        selectPics: state.selectPic.file
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
