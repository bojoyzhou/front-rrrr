import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.css'

class Prompt extends Component {
    handleClose() {
        const {actions} = this.props
        actions.hidePrompt()
    }
    render() {
        const {show, message, actions} = this.props
        if(show){
            setTimeout(() => actions.hidePrompt(), 3000)
        }
        const classname = show ? "container-prompt show" : "container-prompt hide"
        return (
            <div className={classname}>
                <div onClick={this.handleClose.bind(this)} className="close">&times;</div>
                <span>{message}</span>
            </div>
        )
    }
}

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../actions'
function mapStateToProps(state) {
    return {
        show: state.prompt.show,
        message: state.prompt.message
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
)(Prompt)
