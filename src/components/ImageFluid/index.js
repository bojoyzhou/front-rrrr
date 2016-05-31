import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.css'

class ImageFluid extends Component {
    handleSelectPic(id) {
        const actions = this.props.actions
        actions.pickPic(id)
    }
    render() {
        const { pics, children } = this.props
        return (
            <div>
                {
                    pics.map((pic, idx) => {
                        return (
                            <div onClick={ () => this.handleSelectPic(pic.id) } key={idx} className={pic.picked ? "img_fluid active" : "img_fluid"}>
                                <img src={pic.thumb} alt="" />
                                <span className="checked"></span>
                            </div>
                        )
                    })
                }

                {children}
            </div>
        )
    }
}

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../actions'
function mapStateToProps(state) {
    return {
        pics: state.selectPic.selectPics
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
)(ImageFluid)
