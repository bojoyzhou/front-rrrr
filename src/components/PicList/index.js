import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.css'

class PicList extends Component {
    render() {
        const pics = this.props.pics
        return (
            <div className="container-pic-list">
                <ul className="pic-list">
                    {
                        pics.map((pic, idx) => {
                            return (
                                <li key={idx} className="item-img">
                                    <img src={'http://imgs.8zcloud.com/'+pic.thumb} alt="" />
                                    <a href="#" className="close">×</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default PicList
