
import React, { Component } from 'react'
import { Link } from 'react-router'

class Header extends Component {
    render() {
        return (
            <nav>
            <div class="logo">logo</div>
            <ul class="list-group clear">
                <li class="list-group-item item-editor active">
                    <Link to="/editor">
                        <div class="icon"></div>
                        <div class="desc">
                            <i></i>
                            <span>编辑器</span>
                        </div>
                    </Link>
                </li>
                <li class="list-group-item item-doc">
                    <div class="icon"></div>
                    <div class="desc">
                        <i></i>
                        <span>内容库</span>
                    </div>
                </li>
                <li class="list-group-item item-style">
                    <div class="icon"></div>
                    <div class="desc">
                        <i></i>
                        <span>样式中心</span>
                    </div>
                </li>
                <li class="list-group-item item-data">
                    <div class="icon"></div>
                    <div class="desc">
                        <i></i>
                        <span>数据报表</span>
                    </div>
                </li>
                <li class="list-group-item item-user">
                    <div class="icon"></div>
                    <div class="desc">
                        <i></i>
                        <span>个人中心</span>
                    </div>
                </li>
            </ul>
            <div class="right">
                <a class="login" href="">登录</a> |
                <a class="home" href="">home</a>
            </div>
        </nav>
        )
    }
}

export default Header
