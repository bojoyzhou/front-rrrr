import React, { Component } from 'react'
import { Link } from 'react-router'

import style from './style.css'

import PicList from '../PicList'
import ImagesPanel from '../ImagesPanel'

class Images extends Component {
    handleAddPic(){

    }
    fetchDate() {
        this.props.actions.getUserPics()
    }
    componentDidMount() {
         this.fetchDate()
    }
    render() {
        const {pics, addingPic} = this.props
        return (
            <div className="container-images">
                <div className="panel-posts box">
                    <div className="panel-title">
                        我的图库
                        <span>{pics.length}/30</span>
                        <button onClick={this.handleAddPic.bind(this)} className="btn-primary">添加图片</button>
                    </div>
                    <div className="panel-posts-body">
                        <PicList pics={pics}></PicList>
                    </div>
                </div>
                <ImagesPanel addingPic={addingPic}></ImagesPanel>
            </div>
        )
    }
}

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../actions'
function mapStateToProps(state) {
    return {
        pics: state.userPics.pics,
        addingPic: false
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
