
import React, { Component } from 'react'
import { Link } from 'react-router'

class Menu extends Component {
    render() {
        return (
            <ul class="menu">
                <li class="menu-item-1 js-btn-import">
                    <Link to="/editor/import">
                        <i class="pre-icon pre-import"></i>
                        导入内容
                    </Link>
                </li>
                <li class="menu-item-1 js-btn-common">
                    <Link to="/editor/common">
                        <i class="pre-icon pre-edit"></i>
                        常用
                        <i class="after-icon arrow arrow-up"></i>
                    </Link>
                </li>
                <ul class="menu-2">
                    <li class="menu-item-2 js-btn-common" data-id="1">
                        <Link to="/editor/common/1">标题</Link>
                    </li>
                    <li class="menu-item-2 js-btn-common" data-id="2">
                        <Link to="/editor/common/2">正文</Link>
                    </li>
                    <li class="menu-item-2 js-btn-common" data-id="3">
                        <Link to="/editor/common/3">图文</Link>
                    </li>
                    <li class="menu-item-2 js-btn-common" data-id="4">
                        <Link to="/editor/common/4">关注</Link>
                    </li>
                    <li class="menu-item-2 js-btn-common" data-id="5">
                        <Link to="/editor/common/5">分隔</Link>
                    </li>
                    <li class="menu-item-2 js-btn-common" data-id="6">
                        <Link to="/editor/common/6">插件</Link>
                    </li>
                    <li class="menu-item-2 js-btn-common" data-id="7">
                        <Link to="/editor/common/7">其他</Link>
                    </li>
                </ul>
                <li class="menu-item-1 js-btn-image">
                    <Link to="/editor/images">
                        <i class="pre-icon pre-img"></i>
                        我的图库
                    </Link>
                </li>
                <li class="menu-item-1">
                    <Link to="/document">
                        <i class="pre-icon pre-doc"></i>
                        我的内容
                    </Link>
                </li>
            </ul>
        )
    }
}

export default Menu
