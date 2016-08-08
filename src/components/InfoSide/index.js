import React, { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import FileUpload from 'react-fileupload'
import Qrcode from '../Qrcode'
import Animate from 'rc-animate'

import style from './style.less'

import { VelocityComponent, velocityHelpers } from 'velocity-react'
import velocityUi from '../../utils/velocity.ui.js'

class InfoSide extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            show: false,
            render:false,
            change: false
        }
        this.onEnd = this.onEnd.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.updateDimensions = this.updateDimensions.bind(this)
    }
    updateDimensions() {
        const width = document.body.offsetWidth
        const { render, show } = this.state
        if (width > 1550 && !render) {
            this.setState(Object.assign({}, this.state, {
                show: true,
                render: true,
                change: true
            }))
        } else if (width <= 1550 && render) {
            this.setState(Object.assign({}, this.state, {
                show: false,
                render: true,
                change: false
            }))
        }

    }
    componentWillMount() {
        this.updateDimensions();
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    handleClick(){
        const {render, show} = this.state
        this.setState(Object.assign({}, this.state, {
            show: !show,
            render: show ? render : (!render),
            change: !show
        }))
    }
    checkLogin(e){
        const {isLogin, actions} = this.props
        if(!isLogin){
            actions.openLoginDialog()
            e.stopPropagation()
            return false
        }
    }
    onEnd(){
        const {change, render} = this.state
        if(change){
            return
        }
        this.setState(Object.assign({}, this.state, {
            render: !render
        }))
    }
    render() {
        const { show, render, change } = this.state

        return (
            <Animate
                component=""
                transitionName="slideRight"
                showProp="data-show"
                onEnd={ this.onEnd }>
                    { render ? this.fold(show) : this.expand(show) }
            </Animate>
        )
    }
    fold(show){
        const actions = this.props.actions
        const {title, author, summary, cover, save, change, addCover, sync} = this.props
        return (
            <div data-show={show} className="container-info-side">
                <div className="fold"  onClick={this.handleClick}>&gt;&gt;</div>
                <div className="right-container">
                    <h4>标题</h4>
                    <div className="group clear">
                        <textarea cols="30" rows="5" value={ title||'' } onChange={ (e) => { change('title', e.target.value) } }></textarea>
                    </div>

                    <div className="group clear">
                        <h4>作者</h4>
                        <input className="author" value={ author||'' } onChange={ (e) => { change('author', e.target.value) } } />
                    </div>

                    <h4>封面</h4>
                    <div className="group clear">
                        <div onClick={ addCover } className="img_fluid add clear">
                            <img src={cover ? cover : require("./img/img_add.png")} alt="" />
                        </div>
                    </div>

                    <h4>摘要</h4>
                    <div className="group clear">
                        <textarea cols="30" rows="10" value={ summary||'' } onChange={ (e) => { change('summary', e.target.value) } }></textarea>
                    </div>
                    <div className="footer">
                        <a onClick={save} href="javascript:;" className="btn btn-primary">保存</a>
                        <a onClick={sync} href="javascript:;" className="btn">同步到公众号</a>
                    </div>
                </div>
            </div>
        )
    }
    expand(show){
        return (
            <div data-show={show} className="container-info-side expand">
                <div className="publish" onClick={this.handleClick}>
                    <div className="icon"></div>
                    发<br/>布
                </div>
            </div>
        )
    }
}

InfoSide.propTypes = {
    title:PropTypes.string.isRequired,
    author:PropTypes.string,
    summary:PropTypes.string,
    cover:PropTypes.string,
    content: PropTypes.string.isRequired,
    save:PropTypes.func.isRequired,
    sync:PropTypes.func.isRequired,
    change:PropTypes.func.isRequired,
    addCover:PropTypes.func.isRequired,

}

export default InfoSide
