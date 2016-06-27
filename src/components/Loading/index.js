import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.less'

class Loading extends Component {
    render() {
        const style = { display: this.props.show ? "block" : "none" }
        return (
            <div className="loading-container" style = { style }>
                <div className="loading">
                    <div className="wrap">
                        <div className="pw-1">
                            <div className="part p-1"></div>
                        </div>
                        <div className="pw-2">
                            <div className="part p-2"></div>
                        </div>
                        <div className="pw-3">
                            <div className="part p-3"></div>
                        </div>
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
        show: state.loading.show
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
)(Loading)
