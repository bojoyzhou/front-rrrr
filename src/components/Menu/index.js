import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import style from './style.css'

class Menu extends Component {
    render() {
        let pathname = this.props.pathname
        return (
            <ul className="menu">
                <li className="menu-item">
                    <Link className={ pathname == "/editor/import" ? "menu-item-link active" : "menu-item-link"} to="/editor/import">
                        <i className="pre-icon pre-import"></i>
                        导入内容
                    </Link>
                </li>
                <li className="menu-item">
                    <Link className={ pathname == "/editor/common" ? "menu-item-link active" : "menu-item-link"} to="/editor/common">
                        <i className="pre-icon pre-edit"></i>
                        常用
                        <i className="after-icon arrow arrow-up"></i>
                    </Link>
                </li>
                <ul className="sub-menu">
                    <li className="sub-menu-item" data-id="1">
                        <Link activeClassName="active" className="sub-menu-item-link" to="/editor/common/1">标题</Link>
                    </li>
                    <li className="sub-menu-item" data-id="2">
                        <Link activeClassName="active" className="sub-menu-item-link" to="/editor/common/2">正文</Link>
                    </li>
                    <li className="sub-menu-item" data-id="3">
                        <Link activeClassName="active" className="sub-menu-item-link" to="/editor/common/3">图文</Link>
                    </li>
                    <li className="sub-menu-item" data-id="4">
                        <Link activeClassName="active" className="sub-menu-item-link" to="/editor/common/4">关注</Link>
                    </li>
                    <li className="sub-menu-item" data-id="5">
                        <Link activeClassName="active" className="sub-menu-item-link" to="/editor/common/5">分隔</Link>
                    </li>
                    <li className="sub-menu-item" data-id="6">
                        <Link activeClassName="active" className="sub-menu-item-link" to="/editor/common/6">插件</Link>
                    </li>
                    <li className="sub-menu-item" data-id="7">
                        <Link activeClassName="active" className="sub-menu-item-link" to="/editor/common/7">其他</Link>
                    </li>
                </ul>
                <li className="menu-item">
                    <Link className={ pathname == "/editor/images" ? "menu-item-link active" : "menu-item-link"} to="/editor/images">
                        <i className="pre-icon pre-img"></i>
                        我的图库
                    </Link>
                </li>
                <li className="menu-item">
                    <Link className="menu-item-link" to="/document">
                        <i className="pre-icon pre-doc"></i>
                        我的内容
                    </Link>
                </li>
            </ul>
        )
    }
}
function mapStateToProps(state) {
    return {
        pathname: state.routing.locationBeforeTransitions.pathname
    }
}

function mapDispatchToProps(dispatch) {
    return {
        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)
