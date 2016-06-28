import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.less'

class Alert extends Component {
    componentDidMount() {
         this.id = Math.random()
    }
    confirm(){
        const {confirm, actions} = this.props
        confirm && confirm()
    }
    cancel(){
        const {cancel, actions} = this.props
        cancel && cancel()
    }
    render() {
        const {title, desc} = this.props
        const style = {
            textAlign: 'center'
        }
        return (
            <div className="alert-container mask" style={style}>
                <div style={{display:'inline-block'}}>
                    <div className="mask-panel">
                        <div className="mask-title">
                            <h4>{title}</h4><a className="close">×</a></div>
                        <div className="mask-body">
                            <div className="content">{desc}</div>
                        </div>
                        <div className="mask-footer">
                            <button className="btn btn-primary" onClick = {this.confirm.bind(this)}>确认</button>
                            <button className="btn btn-cancel" onClick = {this.cancel.bind(this)}>取消</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Alert
