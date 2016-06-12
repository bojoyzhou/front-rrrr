import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.less'

class Common extends Component {
    render() {
        return (
            <div className="container-common">
                <div className="panel-posts box">
                    <div className="panel-title">
                        常用样式
                    </div>
                    <div className="panel-posts-body">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Common
