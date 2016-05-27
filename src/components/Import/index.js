
import React, { Component } from 'react'
import { Link } from 'react-router'
import OptionPostList from '../OptionPostList'


class Import extends Component {
    render() {
        let posts = this.props.posts
        return (
            <div>
                <div class="panel-import box">
                    <input id="importUrl" type="url" placeholder="输入要导入的文章URL" defaultValue="http://news.163.com/16/0524/09/BNQQJG51000156PO.html" />
                    <button id="import" class="btn-primary">导入</button>
                </div>
                <div class="panel-posts">
                    <div class="box">
                        <div class="panel-title">
                            备选文章
                        </div>
                        <div class="panel-posts-body">
                            <OptionPostList posts={posts}></OptionPostList>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Import
