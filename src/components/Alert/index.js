import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.less'

class Alert extends Component {
    constructor(props, context) {
        super(props, context)
        this.close = this.close.bind(this)
        this.wrap = this.wrap.bind(this)
    }
    close(n, id){
        const {actions} = this.props
        actions.closeAlert(id)
    }
    wrap(id, callback) {
        var close = this.close
        return () => {
            if (callback) {
                callback(() => {
                    close(null, id)
                }, id)
            } else {
                close(null, id)
            }
        }
    }

    render() {
        const {actions, title, desc, btns} = this.props
        return (
            <div>
                {this.props.message.map((m, idx) => {
                    return (
                        <div className="alert-container mask" key={idx}>
                            <div style={{display:'inline-block'}}>
                                <div className="mask-panel">
                                    <div className="mask-title">
                                        <h4>{m.title}</h4><a onClick={ this.wrap(m.id) } className="close">×</a></div>
                                    <div className="mask-body">
                                        <div className="content">{m.desc}</div>
                                    </div>
                                    <div className="mask-footer">
                                        {
                                            m.btns.map((btn, idx) => {
                                                var clname = btn.click ? 'btn btn-primary' : 'btn btn-cancel'
                                                return (<button key={idx} className={clname} onClick = {this.wrap(m.id, btn.click)}>{btn.text}</button>)
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../actions'

function mapStateToProps(state) {
    return {
        message: state.alert.message
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
