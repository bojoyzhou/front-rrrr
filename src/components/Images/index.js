import React, { Component } from 'react'
import { Link } from 'react-router'

import style from './style.less'

import Animate from 'rc-animate'
import Login from '../Login'
import Loading from '../Loading'
import PicList from '../PicList'
import ImagesPanel from '../ImagesPanel'

class Images extends Component {
    constructor(props, context){
        super(props, context)
        this.switchTo = this.switchTo.bind(this)
        this.upload = this.upload.bind(this)
        this.select = this.select.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.add = this.add.bind(this)
        this.search = this.search.bind(this)
        this.deletePic = this.deletePic.bind(this)
        this.selectPic = this.selectPic.bind(this)
        this.state = {
            type: null
        }
    }
    add(){
        const {isLogin} = this.props
        if(isLogin){
            this.switchTo('local')
        }else{
            this.props.onClickLogin()
        }
    }
    switchTo(type){
        this.setState(Object.assign({}, this.state,{
            type
        }))
    }
    upload(file){
        const {actions} = this.props
        actions.upload(file)
        file.value=''
    }
    deletePic(id, e){
        const {actions} = this.props
        actions.deleteImage(id)
        e.stopPropagation()
    }
    selectPic(idx, e){
        const { pics, actions, output } = this.props
        const pic = pics[idx]
        if(output == 'cover'){
            this.props.setCover(pic.thumb)
        }else{
            const html = `<img style="max-width:100%;" src="${pic.url}" onerror="this.src='${pic.thumb}';this.onerror=null" alt="" /><br />`
            actions.insertInto(html)
        }
    }
    select(picked){
        this.picked = picked
    }
    search({keyword, pn}){
        const { actions } = this.props
        actions.searchImage({keyword, pn})
    }
    handleConfirm(){
        const {actions} = this.props
        const picked = this.picked
        const pics = this.props[this.state.type].filter((pic) => {
            for(var i in picked){
                if(pic.id === i){
                    return true
                }
            }
            return false
        })
        actions.saveImage(pics)
        this.setState(Object.assign({}, this.state,{
            type: null
        }))
    }
    handleCancel(){
        this.setState(Object.assign({}, this.state,{
            type: null
        }))
    }
    componentDidMount() {
        const {actions, isLogin, isFetching, pics} = this.props
        if(isLogin != false && pics === null && !isFetching){
            actions.loadImages()
        }
    }
    componentWillReceiveProps(nextProps) {
        const {isLogin, isFetching, pics} = nextProps
        const { actions } = this.props
        if(isLogin != false && pics === null && !isFetching){
            actions.loadImages()
        }
    }
    render() {
        var {images, local, net, pics, isFetching, username} = this.props
        const type = this.state.type
        pics = pics || []
        return (
            <div>
                <div className="container-images">
                    <div className="panel-posts box">
                        <div className="panel-title">
                            我的图库
                            <span>{pics.length}/30</span>
                            <button onClick={ () => { this.add() } } className="btn-primary">添加图片</button>
                        </div>
                        <div className="panel-posts-body">
                            { isFetching ? <Loading></Loading> :
                                <PicList pics={ pics } deletePic={ this.deletePic } selectPic={ this.selectPic }></PicList>
                            }
                        </div>
                    </div>
                </div>
                {type ? <ImagesPanel
                            type={ type }
                            images={ images[type] }
                            switchTo={this.switchTo}
                            upload={this.upload}
                            select={this.select}
                            handleConfirm={this.handleConfirm}
                            handleCancel={this.handleCancel}
                            search={this.search}
                        ></ImagesPanel> : undefined}
            </div>
        )
    }
}

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../actions'
function mapStateToProps(state) {
    return {
        images: state.images,
        local: state.images.local,
        net: state.images.net,
        pics: state.images.pics,
        isFetching: state.images.isFetching,
        username: state.user.username,
        isLogin: !!state.user.username
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
