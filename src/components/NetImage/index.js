import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import style from './style.less'
class NetImage extends Component {
    constructor(props, context){
        super(props, context)
        this.pn = 0
        this.keyword = ''
    }
    down(e){
        if(e.keyCode == 13){
            this.search()
        }
    }
    search(){
        const keyword = this.refs.keyword.value
        if(!keyword){
            return
        }
        const pn = this.pn = 0
        this.keyword = keyword
        this.props.search({keyword, pn})
    }
    loadmore(){
        const keyword = this.keyword
        if(!keyword){
            return
        }
        const pn = ++this.pn
        this.props.search({keyword, pn})
    }
    render() {
        const { images } = this.props
        return (
            <div className="container-net-image">
                <div className="wrapper form">
                    <input ref="keyword" onKeyDown={(e) => {this.down(e)}} type="text"/>
                    <i onClick={() => {this.search()}} className="icon search"></i>
                </div>
                <div className="wrapper stage" ref="panel">
                    <div className="clear">
                        {
                            images.map((pic, idx) => {
                                return (
                                    <div onClick={ () => this.handleSelectPic(pic.id) } key={idx} className={pic.picked ? "img_fluid active" : "img_fluid"}>
                                        <img src={pic.thumb} alt="" />
                                        <span className="checked"></span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="loadmore">
                        <button onClick={ () => this.loadmore() } className="btn btn-more">加载更多</button>
                    </div>
                </div>
            </div>
        )
    }
    list() {
        const { images, select } = this.props
        return images.map((pic, idx) => {
            return (
                <div onClick={ () => select(pic.id) } key={idx} className={pic.picked ? "img_fluid active" : "img_fluid"}>
                    <img src={pic.thumb} alt="" />
                    <span className="checked"></span>
                </div>
            )
        })

    }
}

NetImage.propTypes = {
    images: PropTypes.array.isRequired,
    select: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
}

export default NetImage
