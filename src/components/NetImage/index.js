import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.less'

class NetImage extends Component {
    handleSelectPic(id) {
        const actions = this.props.actions
        actions.pickPic(id)
    }
    down(e){
        const actions = this.props.actions
        if(e.keyCode == 13){
            const key = e.target.value
            actions.searchNetwork(key)
        }
    }
    render() {
        const { netPics, children } = this.props
        return (
            <div className="container-net-image">
                <div className="wrapper form">
                    <input onKeyDown={(e) => {this.down(e)}} type="text"/>
                    <i className="icon search"></i>
                </div>
                <div className="wrapper">
                {
                    netPics.map((pic, idx) => {
                        return (
                            <div onClick={ () => this.handleSelectPic(pic.id) } key={idx} className={pic.picked ? "img_fluid active" : "img_fluid"}>
                                <img src={pic.thumb} alt="" />
                                <span className="checked"></span>
                            </div>
                        )
                    })
                }
                </div>
                <div className="loadmore">
                    <button className="btn btn-more">加载更多</button>
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
        netPics: state.selectPic.netPics
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
)(NetImage)
