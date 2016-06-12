import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.less'

class PicList extends Component {
    handleClick(idx) {
        const { pics, actions } = this.props
        const url = pics[idx].url
        const genHtml = () => {
            return '<img src="' + url.replace(/[^\w\/\.\:]/g, '') + '" alt="" />'
        }
        actions.insertEditor(genHtml())
    }
    handleDelete(id, e) {
        const { pics, actions } = this.props
        actions.deletePic(id)
        e.stopPropagation()
        return false
    }
    render() {
        const { pics } = this.props
        return (
            <div className="container-pic-list">
                <ul className="pic-list">
                    {
                        pics.map((pic, idx) => {
                            return (
                                <li onClick={() => this.handleClick(idx)} key={idx} className="item-img">
                                    <img src={pic.thumb} alt="" />
                                    <a onClick={(e) => this.handleDelete(pic.id, e)} href="javascript:;" className="close">×</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../actions'
function mapStateToProps(state) {
    return {
        pics: state.selectPic.pics
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
)(PicList)
