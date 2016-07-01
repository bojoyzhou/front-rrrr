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

export default Prompt
