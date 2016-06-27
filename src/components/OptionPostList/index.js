import React, { Component } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Alert from '../Alert'

import actions from '../../actions'
import style from './style.less'

class OptionPostList extends Component {
    constructor(props, context) {
        super(props, context)
    }
    componentDidMount(){
        let { actions } = this.props
        actions.getOptionPostList();
    }
    handleClick(docid){
        let { actions } = this.props
        debugger
        actions.getPostDetail({
            docid,
            hook: (result) => {
                actions.insertEditor(result.data.content)
            }
        })
    }
    handleClick(e) {
        const {actions} = this.props
        this.confirmCall = () => {
            actions.getPostDetail({
                docid,
                hook: (result) => {
                    actions.clearEditor()
                    actions.insertEditor(result.data.content)
                }
            })
        }
        this.props.showAlert = true;
    }
    confirm(){
        return this.confirmCall()
    }
    cancel(){

    }
    render() {
        let { posts } = this.props
        const handleClick = this.handleClick.bind(this)
        return (
            <ul className="container-option-post-list">
                {
                    posts.map(function (post, idx){
                        return (
                            <li onClick={() => handleClick(post.docid)} key={idx} className="list-group-posts" data-id="1">
                                <div className="posts-item">
                                    <div className="posts-item-head">
                                        <div className="posts-item-title">{post.title}</div>
                                    </div>
                                    <div className="posts-item-body">{post.summary}</div>
                                    <div className="posts-item-foot">
                                        <span className="author">{post.author}</span>
                                        <span className="date">{post.sendtime}</span>
                                        <span className="link"><a href="1">查看原文</a></span>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }

                <Alert
                    show = {this.props.showAlert}
                    title="信息提示"
                    info="你确认清空当前正在编辑的内容吗？"
                    confirm={this.confirm.bind(this)}
                    cancel={this.cancel.bind(this)}
                />
            </ul>
        )
    }
}


function mapStateToProps(state) {
    return {
        posts: state.optionPostList.posts,
        showAlert: false
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OptionPostList)
