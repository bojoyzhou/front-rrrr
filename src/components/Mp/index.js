import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.less'

class Mp extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render() {
        const { mps, selectMp, checked, close, confirm } = this.props
        return (
            <div className="container-mp">
                <div className="mask">
                    <div className={"mask-panel"}>
                        <div className="mask-title">请选择公众号
                            <a href="#"  onClick={ close } className="close">&times;</a>
                        </div>
                        <div className="mask-body">
                            {
                                mps.map((mp, idx) => {
                                    return (
                                        <div onClick={ () => selectMp(idx)} className={ checked[idx] ? "item checked" : "item"} key={idx}>
                                            <img className="head" src={mp.head_img} alt=""/>
                                            {mp.nick_name}
                                            <div className="stat"></div>
                                        </div>
                                    )
                                })
                            }
                            <div className="item add">
                                <a target="_blank" href="/auth/addwxauth">
                                    <img src={require("./img/add.png")} alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="mask-footer">
                            <div className="right">
                                <button onClick={ confirm } className="btn btn-primary">确定</button>
                                <button onClick={ close } className="btn btn-cancel">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Mp
