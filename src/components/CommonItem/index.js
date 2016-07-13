import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import actions from '../../actions'
import style from './style.less'

class CommonItem extends Component {
    constructor(props, context){
        super(props, context)
        this.handleClick = this.handleClick.bind(this)
    }
    fetchData(){
        let stype = this.props.params.id || 0
        this.props.actions.getCommonStyle({
            stype: stype
        })
    }
    handleClick(idx){
        const { style, onClick } = this.props
        var elem = this.refs['section' + idx]
        onClick(elem.innerHTML)
    }
    render() {
        const { style } = this.props
        const rows = style.map((sty, idx) => {
            return (
                <section ref={ 'section' + idx} onClick={(e) => this.handleClick(idx)} key={idx} dangerouslySetInnerHTML={{__html:sty}}></section>
            )
        })
        return (
            <div className="container-common-item box">
            {rows}
            </div>
        )
    }
}

export default CommonItem
