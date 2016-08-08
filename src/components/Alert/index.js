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
        const {title, desc, btns} = this.props
        return (
            <div className="alert-container mask">
                <div style={{display:'inline-block'}}>
                    <div className="mask-panel">
                        <div className="mask-title">
                            <h4>{title}</h4><a className="close">×</a></div>
                        <div className="mask-body">
                            <div className="content">{desc}</div>
                        </div>
                        <div className="mask-footer">
                            {
                                btns.map((btn, idx) => {
                                    var clname = btn.click ? 'btn btn-primary' : 'btn btn-cancel'
                                    return (<button key={idx} className={clname} onClick = {btn.click}>{btn.text}</button>)
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Alert
