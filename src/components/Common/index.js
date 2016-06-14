import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.less'

import { VelocityComponent } from 'velocity-react'
import velocityUi from '../../utils/velocity.ui.js'
class Common extends Component {
    render() {
        return (
            <VelocityComponent runOnMount={true} animation="fadeIn">
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
            </VelocityComponent>
        )
    }
}

export default Common
