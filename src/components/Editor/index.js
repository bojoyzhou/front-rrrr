import React, { Component } from 'react'
import { Link } from 'react-router'

import style from './style.less'
import Menu from '../Menu'
import TextArea from '../TextArea'

class Editor extends Component {
    render() {
        return (
            <div className="container-editor clear">
                <Menu></Menu>
                {this.props.children}
                <TextArea></TextArea>
            </div>
        )
    }
}

export default Editor
