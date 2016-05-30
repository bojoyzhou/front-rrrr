import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.css'

class ImageFluid extends Component {
    render() {
        const { pics, children } = this.props
        return (
            <div>
                {
                    pics.map((pic, idx) => {
                        return (
                            <div key={idx} className="img_fluid">
                                <img src={pic.thumb} alt="" />
                            </div>
                        )
                    })
                }

                {children}
            </div>
        )
    }
}

export default ImageFluid
