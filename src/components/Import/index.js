
import React, { Component } from 'react'
import { Link } from 'react-router'
import OptionPostList from '../OptionPostList'
import Alert from '../Alert'
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
        this.confirmCall = () => {
            actions.importContent({
                url: this.url,
                hook: (result) => {
                    const content = result.result.content.map((item) => {
                        if(item.text){
                            return '<p>' + item.text + '</p>'
                        }else if(item.img){
                            return '<p><img src="'+ item.img +'"></p>'
                        }
                    }).join('')
                    actions.clearEditor()
                    actions.insertEditor(content)
                }
            })
        }
        this.setState({
            showAlert: true
        })
    }
    getInitialState() {
        return {
            showAlert: false
        }
    }
    confirm(){
        return this.confirmCall()
    }
    cancel(){}
    render() {
        const {importUrl} = this.props
        const {showAlert} = this.state
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

                    <Alert
                        show={showAlert}
                        title="信息提示"
                        info="你确认清空当前正在编辑的内容吗？"
                        confirm={this.confirm.bind(this)}
                        cancel={this.cancel.bind(this)}
                    />
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
