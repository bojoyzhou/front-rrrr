import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import FileUpload from 'react-fileupload'

import ImageFluid from '../ImageFluid'
import NetImage from '../NetImage'
import style from './style.less'

class ImagesPanel extends Component {
    constructor(props, context){
        super(props, context)
        this.state={
            picked: {}
        }
        this.selectFile = this.selectFile.bind(this)
        this.select = this.select.bind(this)
    }
    handleCancel() {
        const actions = this.props.actions
        actions.selectPicCancel()
    }
    handleConfirm() {
        const actions = this.props.actions
        actions.selectPicConfirm()
    }
    selectFile(){
        this.refs.file.click()
    }
    select(picked){
        this.setState(Object.assign({}, this.state, {
            picked
        }))
        this.props.select(picked)
    }
    render() {
        const { images, switchTo, type, handleConfirm, handleCancel } = this.props
        const picked = this.state.picked
        return (
            <div className="container-images-panel open">
                <div className="mask">
                    <div className="mask-panel">
                        <div className="mask-title">
                            <h4>图片上传</h4>
                        </div>
                        <div className="mask-body">
                            <div className="tabs clear">
                                <a className={ type == "local" ? "active" : ""} onClick={() => { switchTo('local') }} href="javascript:;">本地上传</a>
                                <a className={ type == "net" ? "active" : ""} onClick={() => { switchTo('net') }} href="javascript:;">网络图片上传</a>
                            </div>
                            <div className="tabs-content">
                                { type && (type == "local" ? this.local() : this.net()) }
                            </div>
                        </div>
                        <div className="mask-footer">
                            <div className="mask-info"><span className="num-pic">{Object.keys(picked).length}</span>张图片已经被选中</div>
                            <div className="mask-btn">
                                <button onClick={ handleCancel } className="btn cancel">取消</button>
                                {Object.keys(picked).length ? <button onClick={ handleConfirm } className="btn confirm">确定</button>
                                    : '您还未选择图片'}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    local() {
        const { images, upload,} = this.props
        return (
            <div className="wrapper">
                <div className="info">选择文件时，按住ctrl（⌘）键可选择多张图片</div>
                <ImageFluid images={images} select={this.select}>
                    <div onClick={ this.selectFile } className="add">
                        <img src={require("./img/img_add.png")} alt="" />
                        <input ref="file" type="file" multiple="multiple" accept="image/*" onChange={(e)=>{upload(e.target)}}/>
                    </div>
                </ImageFluid>
            </div>
        )
    }
    net() {
        const { images, search } = this.props
        return (
            <NetImage images={images} select={this.select} search={search} />
        )
    }
}

ImagesPanel.propTypes = {
    type: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    switchTo: PropTypes.func.isRequired,
    upload: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
}

export default ImagesPanel
