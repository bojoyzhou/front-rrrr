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
        this.setState({
            show: true
        })
        this.confirmCall = () => {
            actions.getPostDetail({
                docid,
                hook: (result) => {
                    actions.clearEditor(result.data.content)
                    actions.insertEditor(result.data.content)
                }
            })
        }
    }
    confirm(){
        this.confirmCall && this.confirmCall()
        this.setState({
            show: false
        })
    }
    cancel(){
        this.setState({
            show: false
        })
    }
    render() {
        let { posts } = this.props
        const handleClick = this.handleClick.bind(this)
        const alert = {
            title: '提示信息',
            desc: '您确认清除正在编辑的信息吗',
            confirm: this.confirm.bind(this),
            cancel: this.cancel.bind(this)
        }
        return (
            <ul className="container-option-post-list">
                {
                    posts.map(function (post, idx){
                        return (
                            <li key={idx} className="list-group-posts" data-id="1">
                                <div className="posts-item">
                                    <div onClick={() => handleClick(post.docid)} className="posts-item-head">
                                        <div className="posts-item-title">{post.title}</div>
                                    </div>
                                    <div onClick={() => handleClick(post.docid)} className="posts-item-body">{post.summary}</div>
                                    <div className="posts-item-foot">
                                        <span className="date">{post.sendtime}</span>
                                        <span className="link"><a target="_blank" href={'/content/single?docid=' + post.docid}>查看原文</a></span>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
                { this.state && this.state.show ? (<Alert {...alert}></Alert>) : undefined}
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
