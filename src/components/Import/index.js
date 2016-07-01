import React, { Component } from 'react'
import { Link } from 'react-router'
import OptionPostList from '../OptionPostList'
import style from './style.less'

class Import extends Component {
    constructor(props, context){
        super(props, context)
        this.handleClick = this.handleClick.bind(this)
        this.importById = this.importById.bind(this)

    }
    handleClick() {
        const url = this.refs.url.value
        this.importByUrl(url)
    }
    importById(docid) {
        const {actions} = this.props
        actions.getPostById(docid)
    }
    importByUrl(url) {
        const {actions} = this.props
        actions.getPostByUrl(url)
    }
    componentDidMount() {
        const {actions} = this.props
        actions.loadPosts()
    }
    render() {
        const {postslist, postsisFetching} = this.props
        return (
            <div className="container-import">
                <div className="panel-import box">
                    <input ref="url" type="url" placeholder="输入要导入的文章URL" />
                    <button onClick={this.handleClick} className="btn-primary">导入</button>
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
