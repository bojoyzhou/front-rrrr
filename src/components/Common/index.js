
import React, { Component } from 'react'
import { Link } from 'react-router'

class Common extends Component {
    render() {
        return (
            <div class="panel-posts box">
                <div class="panel-title">
                    常用样式
                </div>
                <div class="panel-posts-body js-plugin-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Common
