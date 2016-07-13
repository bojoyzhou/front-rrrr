import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.less'

import { ChromePicker } from 'react-color';
import CommonItem from '../CommonItem'

class Common extends Component {
    constructor(props, context) {
        super(props, context)
        this.onClick = this.onClick.bind(this)
        this.onChangeComplete =  this.onChangeComplete.bind(this)
        this.checkColor =  this.checkColor.bind(this)
        this.closeColor =  this.closeColor.bind(this)
        this.pickColor = this.pickColor.bind(this)
        this.state = {
            showColor:false,
            color: ''
        }
    }
    componentDidMount() {
        const { actions, id } = this.props
        actions.loadStyles(id)
    }
    onClick(html) {
        const { actions } = this.props
        actions.insertInto(html)
    }
    componentDidUpdate(prevProps) {
        const { actions, isFetching, id } = this.props
        if (prevProps.type !== id && !prevProps.styles['style' + id] && !isFetching) {
            actions.loadStyles(id)
        } else if(prevProps.type !== id && !isFetching) {
            //从缓存load
            actions.loadStylesFromCache(id)
        }
    }
    checkColor(){
        var rgb = this.state.color
        var color = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
        Array.prototype.slice.call(this.refs.node.querySelectorAll('*')).forEach( element => {
            if(element.style.backgroundColor){
                element.style.backgroundColor = color
            }
            if(element.style.borderColor && element.style.borderColor.match(/^(rgb|#)/)){
                element.style.borderColor = color
            }
            if(element.style.borderLeftColor && element.style.borderLeftColor.match(/^(rgb|#)/)){
                element.style.borderLeftColor = color
            }
            if(element.style.borderBottomColor && element.style.borderBottomColor.match(/^(rgb|#)/)){
                element.style.borderBottomColor = color
            }
            if(element.style.borderRightColor && element.style.borderRightColor.match(/^(rgb|#)/)){
                element.style.borderRightColor = color
            }
            if(element.style.borderTopColor && element.style.borderTopColor.match(/^(rgb|#)/)){
                element.style.borderTopColor = color
            }
        })

        this.setState(Object.assign({}, this.state, {
            showColor: false
        }))
    }
    closeColor(){
        this.setState(Object.assign({}, this.state, {
            showColor: false
        }))
    }
    onChangeComplete(color){
        this.setState(Object.assign({}, this.state, {
            color: color.rgb
        }))
    }
    pickColor(){
        this.setState(Object.assign({}, this.state, {
            showColor: true
        }))
    }
    render() {
        const {styles, type} = this.props
        const {showColor, color} = this.state
        const style = styles['style' + type]
        return (
            <div className="container-common" style={{ zIndex: showColor ? 3 : 1}}>
                <div className="panel-posts box">
                    <div className="panel-title">
                        常用样式
                        <div className="style">主题 <div onClick={this.pickColor} className="color"></div></div>
                    </div>
                    <div ref="node" className="panel-posts-body">
                        <CommonItem style={ style } onClick={ this.onClick }></CommonItem>
                    </div>
                </div>
                { showColor ?
                    <div className="color-picker">
                        <ChromePicker color={this.state.color} onChangeComplete={ this.onChangeComplete }></ChromePicker>
                        <div>
                            <button className="btn btn-primary" onClick={this.checkColor}>确认</button>
                        </div>
                        <a className="btn-cancel" onClick = {this.closeColor} href="javascript:;" >&times;</a>
                    </div>
                    : null
                }
            </div>
        )
    }
}
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../actions'
function mapStateToProps(state) {
    return {
        pathname: state.routing.locationBeforeTransitions.pathname,
        styles: state.styles,
        type: state.styles.type,
        isFetching: state.styles.isFetching
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
)(Common)
