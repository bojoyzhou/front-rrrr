import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.css'

class Qrcode extends Component {
    close() {
        const {actions} = this.props
        actions.closePreView()
    }
    render() {
        const {preview, rawUrl} = this.props
        const show = preview ? 'block' : 'none'
        return (
            <div className="container-qrcode" style={{display: show}}>
                <div className="wrapper">
                    <div className="title">请用手机扫描如下二维码</div>
                    <div className="qr-wrapper">
                        <img src={preview} alt=""/>
                    </div>
                    <div className="footer">
                        <div className="btn-group">
                            <a className="btn" target="_blank" href={rawUrl}>用浏览器打开</a>
                            <a onClick={this.close.bind(this)} className="btn cancel">取消</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Qrcode
