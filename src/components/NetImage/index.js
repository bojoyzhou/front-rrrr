import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import style from './style.less'
class NetImage extends Component {
    constructor(props, context){
        super(props, context)
        this.pn = 0
        this.keyword = ''
        this.select = this.select.bind(this)
        this.state={picked:[]}
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
        const { images } = this.props
        const handleSelectPic = this.props.select
        const {picked} = this.state

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
                                const p = picked[pic.id]
                                return (
                                    <div onClick={ () => this.select(pic.id) } key={idx} className={p ? "img_fluid active" : "img_fluid"}>
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
