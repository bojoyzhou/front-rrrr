import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import style from './style.less'

class PicList extends Component {
    render() {
        const { pics, deletePic, selectPic } = this.props
        return (
            <div className="container-pic-list">
                <ul className="pic-list">
                    {
                        pics.map((pic, idx) => {
                            return (
                                <li onClick={() => selectPic(idx)} key={idx} className="item-img">
                                    <img src={pic.thumb} alt="" />
                                    <a onClick={(e) => deletePic(pic.id, e)} href="javascript:;" className="close">×</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

PicList.propTypes = {
    pics: PropTypes.array.isRequired,
    deletePic: PropTypes.func.isRequired,
    selectPic: PropTypes.func.isRequired
}

export default PicList
