import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.less'

class Alert extends Component {
    componentDidMount() {
         this.id = Math.random()
    }
    confirm(){
        const {confirm, actions} = this.props
        if(confirm && confirm() !== false || !confirm){
            this.props.show = false
        }
    }
    cancel(){
        const {cancel, actions} = this.props
        if(cancel && cancel() !== false || !cancel){
            this.props.show = false
        }
    }
    render() {
        const {show, title, info} = this.props
        const style = {
            display: show ? 'block' : 'none',
            textAlign: 'center'
        }
        return (
            <div className="mask" style={style}>
                <div style={{display:'inline-block'}}>
                    <div className="mask-panel">
                        <div className="mask-title">
                            <h4>{title}</h4><a className="close">×</a></div>
                        <div className="mask-body">
                            <div className="content">{info}</div>
                        </div>
                        <div className="mask-footer">
                            <button key={this.id + '-confirm'} className="btn btn-primary" onClick = {this.confirm.bind(this)}>确认</button>
                            <button key={this.id + '-cancel'} className="btn btn-cancel" onClick = {this.cancel.bind(this)}>取消</button>
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
        show: state.alert.show
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
)(Alert)
