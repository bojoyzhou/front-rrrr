
import React, { Component } from 'react'
import { Link } from 'react-router'
import OptionPostList from '../OptionPostList'
import style from './style.css'


class Import extends Component {
    render() {
        let posts = this.props.posts
        return (
            <div className="container-import">
                <div className="panel-import box">
                    <input id="importUrl" type="url" placeholder="输入要导入的文章URL" defaultValue="http://news.163.com/16/0524/09/BNQQJG51000156PO.html" />
                    <button id="import" className="btn-primary">导入</button>
                </div>
                <div className="panel-posts">
                    <div className="box">
                        <div className="panel-title">
                            备选文章
                        </div>
                        <div className="panel-posts-body">
                            <OptionPostList posts={posts}></OptionPostList>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Import
