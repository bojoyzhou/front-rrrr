import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import style from './style.less'

class ImageFluid extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            picked: {}
        }
    }
    select(id) {
        const picked = this.state.picked
        let tmp = {}
        if(!picked[id]){
            tmp[id] = 1
            tmp = Object.assign({}, picked, tmp)
        }else{
            tmp = picked
            delete tmp[id]
        }
        this.setState(Object.assign({}, this.state, {
            picked: tmp
        }))
        this.props.select(tmp)
    }
    render() {
        const { images, children, select } = this.props
        const {picked} = this.state
        return (
            <div className="imgfluid-container">
                {
                    images.map((pic, idx) => {
                        const p = picked[pic.id]
                        return (
                            <div onClick={ () => this.select(pic.id) } key={idx} className={p ? "img_fluid active" : "img_fluid"}>
                                <img src={pic.thumb} alt="" />
                                <span className="checked"></span>
                            </div>
                        )
                    })
                }

                {children}
            </div>
        )
    }
}


ImageFluid.propTypes = {
    images: PropTypes.array.isRequired,
    select: PropTypes.func.isRequired,
}

export default ImageFluid
