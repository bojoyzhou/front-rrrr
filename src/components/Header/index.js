import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.css'

class Header extends Component {
    render() {
        return (
            <nav className="nav">
                <div className="nav-logo">logo</div>
                <ul className="nav-ul clear">
                    <li className="nav-item nav-item-editor nav-active">
                        <Link className="nav-link" to="/editor">
                            <div className="icon"></div>
                            <div className="desc">
                                <i></i>
                                <span>编辑器</span>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item nav-item-doc">
                        <Link className="nav-link" to="/editor">
                            <div className="icon"></div>
                            <div className="desc">
                                <i></i>
                                <span>内容库</span>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item nav-item-style">
                        <Link className="nav-link" to="/editor">
                            <div className="icon"></div>
                            <div className="desc">
                                <i></i>
                                <span>样式中心</span>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item nav-item-data">
                        <Link className="nav-link" to="/editor">
                            <div className="icon"></div>
                            <div className="desc">
                                <i></i>
                                <span>数据报表</span>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item nav-item-user">
                        <Link className="nav-link" to="/editor">
                            <div className="icon"></div>
                            <div className="desc">
                                <i></i>
                                <span>个人中心</span>
                            </div>
                        </Link>
                    </li>
                </ul>
                <div className="right">
                    <a className="login" href="">登录</a> |
                    <a className="home" href="">home</a>
                </div>
            </nav>
        )
    }
}

export default Header
