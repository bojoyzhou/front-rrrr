import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import style from './style.less'

import { VelocityTransitionGroup } from 'velocity-react'
import velocityUi from '../../utils/velocity.ui.js'
class NetImage extends Component {
    handleSelectPic(id) {
        const actions = this.props.actions
        actions.pickPic({
            id,
            type: 'net'
        })
    }
    down(e){
        if(e.keyCode == 13){
            this.search()
        }
    }
    search(){
        const actions = this.props.actions
        const keyword = this.refs.keyword.value
        actions.searchNetwork({ keyword })
    }
    loadmore(){
        const actions = this.props.actions
        const keyword = this.refs.keyword.value
        actions.searchNetwork()
    }
    componentDidUpdate() {
        const { netPics } = this.props
        if(netPics.length == 20) {
            const node = ReactDOM.findDOMNode(this.refs.panel)
            node.scrollTop = 0
        }
    }
    render() {
        const { netPics } = this.props
        const list = this.list()
        return (
            <div className="container-net-image">
                <div className="wrapper form">
                    <input ref="keyword" onKeyDown={(e) => {this.down(e)}} type="text"/>
                    <i onClick={() => {this.search()}} className="icon search"></i>
                </div>
                <div className="wrapper stage" ref="panel">
                    <VelocityTransitionGroup component="div" className="clear" enter={{animation: "transition.fadeIn"}} leave={{animation: "transition.fadeOut"}}>
                        {list}
                    </VelocityTransitionGroup>
                    <div className="loadmore">
                        <button onClick={ () => this.loadmore() } className="btn btn-more">加载更多</button>
                    </div>
                </div>
            </div>
        )
    }
    list() {
        const { netPics } = this.props
        return netPics.map((pic, idx) => {
            return (
                <div onClick={ () => this.handleSelectPic(pic.id) } key={idx} className={pic.picked ? "img_fluid active" : "img_fluid"}>
                    <img src={pic.thumb} alt="" />
                    <span className="checked"></span>
                </div>
            )
        })

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
