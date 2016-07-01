import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Alert from '../Alert'

import actions from '../../actions'
import style from './style.less'

class OptionPostList extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            show: false
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(docid){
        this.props.import(docid)
    }
    render() {
        const { posts, isFetching } = this.props
        const { show } = this.state
        const handleClick = this.handleClick
        return (
            <ul className="container-option-post-list">
                { isFetching ? 'loading' :
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
OptionPostList.propTypes = {
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    import: PropTypes.func.isRequired
}

export default OptionPostList
