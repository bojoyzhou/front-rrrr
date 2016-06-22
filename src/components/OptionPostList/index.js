import React, { Component } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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
        actions.getPostDetail({
            docid,
            hook: (result) => {
                actions.insertEditor(result.data.content)
            }
        })
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
            </ul>
        )
    }
}


function mapStateToProps(state) {
    return {
        posts: state.optionPostList.posts
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
