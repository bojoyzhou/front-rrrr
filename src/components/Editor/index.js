import React, { Component } from 'react'
import { Link } from 'react-router'

import style from './style.less'
import Menu from '../Menu'
import TextArea from '../TextArea'
import InfoSide from '../InfoSide'
import Qrcode from '../Qrcode'
import Login from '../Login'
import Prompt from '../Prompt'
import Loading from '../Loading'

class Editor extends Component {
    render() {
        const { content, title, author, summary, cover, isSaved } = this.props
        console.log('editor render')
        console.log(this.props)
        return (
            <div style={ {width: "100%", height: "100%"} }>
                <div className="container-editor clear">
                    <Menu></Menu>
                    {this.props.children}
                    <TextArea content={ content }></TextArea>
                </div>
                <InfoSide
                    title={ title }
                    author={ author }
                    summary={ summary }
                    cover={ cover }
                    isSaved={ isSaved }
                ></InfoSide>
                <Qrcode></Qrcode>
                <Prompt></Prompt>
                <Loading></Loading>
            </div>
        )
    }
}
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../actions'

function mapStateToProps(state) {
    return {
        content: state.post.content,
        title: state.post.title,
        author: state.post.author,
        summary: state.post.summary,
        cover: state.post.cover,
        isSaved: state.post.isSaved
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
)(Editor)
