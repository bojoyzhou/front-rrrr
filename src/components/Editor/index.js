
import React, { Component } from 'react'
import { Link } from 'react-router'

import Menu from '../Menu'

class Editor extends Component {
    render() {
        return (
            <div>
                <Menu></Menu>
                {this.props.children}
                <div> main </div>
            </div>
        )
    }
}

export default Editor
