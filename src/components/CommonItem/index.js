import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import actions from '../../actions'
import style from './style.css'

class CommonItem extends Component {
    fetchData(){
        let stype = this.props.params.id || 0
        this.props.actions.getCommonStyle({
            stype: stype
        })
    }
    componentDidMount() {
        this.fetchData()
    }
    componentDidUpdate(prevProps) {
        if(prevProps.params.id == this.props.params.id){
            return ;
        }
        this.fetchData()
    }
    handleClick(e){
        debugger
    }
    render() {
        let styleHtml = this.props.styleHtml
        return (
            <div className="container-common-item box">
                {
                    styleHtml.map((style, idx) => {
                        return (
                            <section key={idx} dangerouslySetInnerHTML={{__html:style}}></section>
                        )
                    })
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        styleHtml: state.commonStyle.styleHtml
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
)(CommonItem)
