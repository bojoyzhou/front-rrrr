import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.less'

import CommonItem from '../CommonItem'

class Common extends Component {
    constructor(props, context) {
        super(props, context)
        this.onClick = this.onClick.bind(this)
    }
    componentDidMount() {
        const { actions, id } = this.props
        actions.loadStyles(id)
    }
    onClick(html) {
        const { actions } = this.props
        actions.insertInto(html)
    }
    componentDidUpdate(prevProps) {
        const { actions, isFetching, id } = this.props
        if (prevProps.type !== id && !prevProps.styles['style' + id] && !isFetching) {
            actions.loadStyles(id)
        } else if(prevProps.type !== id && !isFetching) {
            //从缓存load
            actions.loadStylesFromCache(id)
        }
    }
    render() {
        const {styles, type} = this.props
        const style = styles['style' + type]
        return (
            <div className="container-common">
                <div className="panel-posts box">
                    <div className="panel-title">
                        常用样式
                    </div>
                    <div className="panel-posts-body">
                        <CommonItem style={ style } onClick={ this.onClick }></CommonItem>
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
        pathname: state.routing.locationBeforeTransitions.pathname,
        styles: state.styles,
        type: state.styles.type,
        isFetching: state.styles.isFetching
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
)(Common)
