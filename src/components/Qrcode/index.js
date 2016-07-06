import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.css'

class Qrcode extends Component {
    render() {
        const { qrimg, url, close } = this.props
        return (
            <div className="container-qrcode">
                <div className="wrapper">
                    <div className="title">请用手机扫描如下二维码</div>
                    <div className="qr-wrapper">
                        <img src={qrimg} alt=""/>
                    </div>
                    <div className="footer">
                        <div className="btn-group">
                            <a className="btn" target="_blank" href={url}>用浏览器打开</a>
                            <a onClick={close} className="btn cancel">取消</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Qrcode
