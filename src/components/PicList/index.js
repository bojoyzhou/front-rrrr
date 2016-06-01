import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.css'

class PicList extends Component {
    handleClick(idx) {
        const { pics, actions } = this.props
        const url = pics[idx].pic
        const genHtml = () => {
            return '<img src="' + url.replace(/[^\w\/\.\:]/g, '') + '" alt="" />'
        }
        actions.insertEditor(genHtml())
    }
    handleDelete(idx) {
        const { pics, actions } = this.props
        actions.deletePic(pics[idx])
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
                                    <a onClick={() => this.handleDelete(idx)} href="#" className="close">×</a>
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
    return { }
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
