import React, { Component } from 'react'
import { Link } from 'react-router'
import OptionPostList from '../OptionPostList'
import style from './style.less'

class Import extends Component {
    constructor(props, context){
        super(props, context)
        this.handleClick = this.handleClick.bind(this)
        this.importById = this.importById.bind(this)
        this.inputOn = this.inputOn.bind(this)
        this.state = {
            closeDisplay: 'none'
        }
    }
    handleClick() {
        const url = this.refs.url.value
        this.importByUrl(url)
    }
    importById(docid) {
        const {actions} = this.props
        const replaceCall = () => {
            actions.getPostById({docid})
        }

        return actions.alert({
            title: '提示',
            desc: '您确认清除正在编辑的信息吗',
            btns: [{
                text: '清除',
                click: (close) => {
                    close()
                    setTimeout(replaceCall)
                }
            },{
                text: '关闭'
            }]
        })
    }
    importByUrl(url) {
        const {actions} = this.props
        if(!url){
            return actions.alert({
                title: '提示',
                desc: '文章链接不能为空',
                btns: [{
                    text: '关闭'
                }]
            })
        }
        var that = this
        const replaceCall = () => {
            actions.getPostByUrl({
                url,
                callback: () => {
                    return actions.alert({
                        title: '提示',
                        desc: '导入失败',
                        btns: [{
                            text: '关闭'
                        }]
                    })
                }
            })
        }
        return actions.alert({
            title: '提示',
            desc: '您确认清除正在编辑的信息吗',
            btns: [{
                text: '清除',
                click: (close) => {
                    close()
                    setTimeout(replaceCall)
                }
            },{
                text: '关闭'
            }]
        })
    }
    componentDidMount() {
        const {actions} = this.props
        actions.loadPosts()
    }
    inputOn(){
        var value = this.refs.url.value
        this.setState(Object.assign({}, this.state, {
            closeDisplay: value ? 'block' : 'none'
        }))
    }
    render() {
        const {postslist, postsisFetching} = this.props
        var display = this.state.closeDisplay
        var that = this
        return (
            <div className="container-import">
                <div className="panel-import box">
                    <div className="input">
                        <input onInput={this.inputOn} ref="url" type="url" placeholder="输入要导入的文章URL" />
                        <span style={{display}} onClick={ () => {that.refs.url.value=''; that.inputOn()} } className="close">&times;</span>
                    </div>
                    <button onClick={this.handleClick} className="btn-import">导入</button>
                </div>
                <div className="panel-posts">
                    <div className="panel-scroll box">
                        <div className="panel-title">
                            备选文章
                        </div>
                        <div className="panel-posts-body">
                            <OptionPostList import={ this.importById } posts={ postslist } isFetching={ postsisFetching }></OptionPostList>
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
        postslist: state.posts.list,
        postsisFetching: state.posts.isFetching
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
)(Import)
