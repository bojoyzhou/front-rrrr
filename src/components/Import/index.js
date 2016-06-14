
import React, { Component } from 'react'
import { Link } from 'react-router'
import OptionPostList from '../OptionPostList'
import style from './style.less'

import { VelocityComponent } from 'velocity-react'
import velocityUi from '../../utils/velocity.ui.js'

class Import extends Component {
    handleChange(e) {
        const {actions} = this.props
        this.url = e.target.value
    }
    handleClick(e) {
        const {actions} = this.props
        actions.importContent({
            url: this.url,
            hook: (result) => {
                actions.insertEditor(result.data.content)
            }
        })
    }
    render() {
        const {importUrl} = this.props
         // defaultValue="http://news.163.com/16/0524/09/BNQQJG51000156PO.html"
        return (
            <VelocityComponent runOnMount={true} animation="fadeIn">
            <div className="container-import">
                <div className="panel-import box">
                    <input onChange={this.handleChange.bind(this)} type="url" placeholder="输入要导入的文章URL" />
                    <button onClick={this.handleClick.bind(this)} className="btn-primary">导入</button>
                </div>
                <div className="panel-posts">
                    <div className="panel-scroll box">
                        <div className="panel-title">
                            备选文章
                        </div>
                        <div className="panel-posts-body">
                            <OptionPostList></OptionPostList>
                        </div>
                    </div>
                </div>
            </div>
            </VelocityComponent>
        )
    }
}

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../actions'
function mapStateToProps(state) {
    return {
        importUrl: state.optionPostList.importUrl
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
)(Import)
