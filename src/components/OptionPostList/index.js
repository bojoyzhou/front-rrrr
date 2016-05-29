import React, { Component } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import actions from '../../actions'
import style from './style.css'

class OptionPostList extends Component {
    constructor(props, context) {
        super(props, context)
    }
    componentDidMount(){
        let { actions } = this.props
        actions.getOptionPostList();
    }
    render() {
        let { posts } = this.props        

        return (
            <ul>
                {
                    posts.map(function (post, idx){
                        return (
                            <li key={idx} className="list-group-posts" data-id="1">
                                <div className="posts-item">
                                    <div className="posts-item-head">
                                        <div className="posts-item-title">{post.title}</div>
                                        <div className="close">×</div>
                                    </div>
                                    <div className="posts-item-body">{post.content}</div>
                                    <div className="posts-item-foot">
                                        <span className="author">{post.source}</span>
                                        <span className="date">{post.date}</span>
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
