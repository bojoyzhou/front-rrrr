import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import style from './style.less'

class Menu extends Component {
    render() {
        let pathname = this.props.pathname
        return (
            <ul className="menu">
                <li className="menu-item">
                    <Link className={ pathname == "/editor/import" ? "menu-link active" : "menu-link"} to="/editor/import">
                        <i className="icon ico-import"></i>导入
                    </Link>
                </li>
                <li className="menu-item">
                    <Link className={ pathname == "/editor/common" ? "menu-link active" : "menu-link"} to="/editor/common/0">
                        <i className="icon ico-pen"></i>常用
                    </Link>
                    <ul className="sub-menu">
                        <li className="sub-menu-item"><Link activeClassName="active" className="sub-menu-link" to="/editor/common/1">标题</Link></li>
                        <li className="sub-menu-item"><Link activeClassName="active" className="sub-menu-link" to="/editor/common/2">正文</Link></li>
                        <li className="sub-menu-item"><Link activeClassName="active" className="sub-menu-link" to="/editor/common/3">图文</Link></li>
                        <li className="sub-menu-item"><Link activeClassName="active" className="sub-menu-link" to="/editor/common/4">关注</Link></li>
                        <li className="sub-menu-item"><Link activeClassName="active" className="sub-menu-link" to="/editor/common/5">分隔</Link></li>
                        <li className="sub-menu-item"><Link activeClassName="active" className="sub-menu-link" to="/editor/common/6">插件</Link></li>
                        <li className="sub-menu-item"><Link activeClassName="active" className="sub-menu-link" to="/editor/common/7">其他</Link></li>
                    </ul>
                </li>
                <li className="menu-item"><Link className={ pathname == "/editor/images" ? "menu-link active" : "menu-link"} to="/editor/images"><i className="icon ico-img"></i>我的图库</Link></li>
                <li className="menu-item"><a href="/usergrabwords/index" className="menu-link"><i className="icon ico-file"></i>我的内容</a></li>
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
