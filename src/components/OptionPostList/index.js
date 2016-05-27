
import React, { Component } from 'react'
import { Link } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as optionPostList from '../../actions/optionPostList'

class OptionPostList extends Component {
    render() {
        let { posts, actions } = this.props
        actions.getOptionPostList({
            status:'request'
        });
        return (
            <ul class="js-posts">
                {
                    posts.map(function (post){
                        return (
                            <li class="list-group-posts" data-id="1">
                                <div class="posts-item">
                                    <div class="posts-item-head">
                                        <div class="posts-item-title">{post.title}</div>
                                        <div class="close">×</div>
                                    </div>
                                    <div class="posts-item-body">{post.content}</div>
                                    <div class="posts-item-foot">
                                        <span class="author">{post.source}</span>
                                        <span class="date">{post.date}</span>
                                        <span class="link"><a href="1">查看原文</a></span>
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
        actions: bindActionCreators(optionPostList, dispatch),
        dispatch: dispatch
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OptionPostList)
