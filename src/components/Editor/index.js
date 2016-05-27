
import React, { Component } from 'react'
import { Link } from 'react-router'

import Menu from '../Menu'

class Editor extends Component {
    render() {
        return (
            <div>
                <Menu></Menu>
                {this.props.children}
                <p>main</p>
            </div>
        )
    }
}

export default Editor
