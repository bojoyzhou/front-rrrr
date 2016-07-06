import React, { Component } from 'react'
import { Link } from 'react-router'
import OptionPostList from '../OptionPostList'
import style from './style.less'

import Alert from '../Alert'

class Import extends Component {
    constructor(props, context){
        super(props, context)
        this.handleClick = this.handleClick.bind(this)
        this.importById = this.importById.bind(this)
        this.confirmClear = this.confirmClear.bind(this)
        this.cancelClear = this.cancelClear.bind(this)
        this.state = {
            alert: false
        }

    }
    handleClick() {
        const url = this.refs.url.value
        this.importByUrl(url)
    }
    importById(docid) {
        const {actions} = this.props
        this.replaceCall = () => {
            actions.getPostById({docid})
            this.replaceCall = null
        }
        this.setState(Object.assign({}, this.state, {
            alert: true
        }))
    }
    importByUrl(url) {
        const {actions} = this.props
        this.replaceCall = () => {
            actions.getPostByUrl(url)
            this.replaceCall = null
        }
        this.setState(Object.assign({}, this.state, {
            alert: true
        }))
    }
    componentDidMount() {
        const {actions} = this.props
        actions.loadPosts()
    }

    confirmClear() {
        this.replaceCall()
        this.cancelClear()
    }
    cancelClear() {
        this.setState(Object.assign({}, this.state, {
            alert: false
        }))
    }
    render() {
        const {postslist, postsisFetching} = this.props
        const alert = {
            title: '提示信息',
            desc: '您确认清除正在编辑的信息吗',
            confirm: this.confirmClear,
            cancel: this.cancelClear
        }
        return (
            <div className="container-import">
                <div className="panel-import box">
                    <input ref="url" type="url" placeholder="输入要导入的文章URL" />
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
                { this.state.alert ? (<Alert {...alert}></Alert>) : undefined}
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
