import React, { Component } from 'react'
import { Link } from 'react-router'

import style from './style.less'

import PicList from '../PicList'
import ImagesPanel from '../ImagesPanel'

import { VelocityComponent } from 'velocity-react'
import velocityUi from '../../utils/velocity.ui.js'
class Images extends Component {
    handleAddPic(){
        const {isLogin, actions} = this.props
        if(isLogin){
            actions.selectPicOpen()
        }else{
            actions.openLoginDialog()
        }
    }
    fetchData() {
        const {isLogin, actions} = this.props
        if(isLogin !== false){
            actions.getUserPics()
        }
    }
    componentDidMount() {
        this.fetchData()
    }
    render() {
        const {pics, addingPic, isActived} = this.props
        return (
            <VelocityComponent runOnMount={true} animation="fadeIn">
            <div style={{height: '100%'}}>
                <div className="container-images">
                    <div className="panel-posts box">
                        <div className="panel-title">
                            我的图库
                            <span>{pics.length}/30</span>
                            <button onClick={this.handleAddPic.bind(this)} className="btn-primary">添加图片</button>
                        </div>
                        <div className="panel-posts-body">
                            <PicList></PicList>
                        </div>
                    </div>
                </div>
                {isActived ? <ImagesPanel></ImagesPanel> : undefined}
            </div>
            </VelocityComponent>
        )
    }
}

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../actions'
function mapStateToProps(state) {
    return {
        isActived: state.selectPic.isActived,
        pics: state.selectPic.pics,
        addingPic: false,
        isLogin: state.login.isLogin
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
)(Images)
