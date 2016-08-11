import React, { Component } from 'react'
import { Link } from 'react-router'
import { history } from '../../utils'

import Animate from 'rc-animate'
import style from './style.less'
import Menu from '../Menu'
import Header from '../Header'
import TextArea from '../TextArea'
import InfoSide from '../InfoSide'
import Qrcode from '../Qrcode'
import Login from '../Login'
import Mp from '../Mp'
import Alert from '../Alert'
import Import from '../Import'
import Common from '../Common'
import Images from '../Images'
import Loading from '../Loading'

class Editor extends Component {
    constructor(props, context){
        super(props, context)
        this.onClickLogin = this.onClickLogin.bind(this)
        this.onClickClose = this.onClickClose.bind(this)
        this.login = this.login.bind(this)
        this.syncContent = this.syncContent.bind(this)
        this.setCover = this.setCover.bind(this)
        this.addCover = this.addCover.bind(this)
        this.onClick = this.onClick.bind(this)
        this.closeQr = this.closeQr.bind(this)
        this.change = this.change.bind(this)
        this.preview = this.preview.bind(this)
        this.save = this.save.bind(this)
        this.syncClick = this.syncClick.bind(this)
        this.closeMp = this.closeMp.bind(this)
        this.selectMp = this.selectMp.bind(this)
        this.confirmMp = this.confirmMp.bind(this)
        this.addColor = this.addColor.bind(this)
        this.state = {
            title: '',
            author: '',
            summary: '',
            cover: '',
            output: 'editor',
            showLogin: '',
            showQR: false,
            qrimg: '',
            url: '',
            showMps: false,
            mpschecked: [],
            colors: [],
            // {
            //     title: 'asdf',
            //     desc: 'asdfaf',
            //     btns:[{text: '取消'}]
            // }
        }
    }
    onClickLogin() {
        this.setState(Object.assign({}, this.state, {
            showLogin: true
        }))
    }
    onClickClose() {
        this.setState(Object.assign({}, this.state, {
            showLogin: false
        }))
    }
    login(data) {
        const { actions } = this.props
        var that = this
        actions.userLogin({
            ...data,
            callback: (json) => {
                if(json.ret_code == 0){
                    that.onClickClose()
                }
            }
        })
    }
    syncContent(content){
        const {actions} = this.props
        if(this.oldContent !== content){
            this.oldContent = content
            this.dont = true
            actions.setContent(content)
        }
    }
    onClick(e){
        this.setState(Object.assign({}, this.state, {
            output: 'editor'
        }))
    }
    closeQr(){
        this.setState(Object.assign({}, this.state, {
            showQR: false
        }))
    }
    setCover(cover){
        this.setState(Object.assign({}, this.state, {
            cover
        }))
    }
    addCover(){
        history.push('/editor/images')
        this.dont = true
        setTimeout(() => {
            this.setState(Object.assign({}, this.state, {
                output: 'cover'
            }))
        }, 100)
    }
    change(prop, value){
        this.setState(Object.assign({}, this.state, {
            [prop]: value
        }))
    }
    save(){
        const {content, actions, docid, isLogin} = this.props
        const { title, author, summary, cover } = this.state
        var that = this
        if(!isLogin){
            return this.onClickLogin()
        }
        if(!content || !title){
            return actions.alert({
                title: '提示',
                desc: '标题和内容不能为空',
                btns: [{
                    text: '关闭'
                }]
            })
        }
        actions.savePost({
            docid,
            content,
            title,
            author,
            summary,
            pics: JSON.stringify([cover]),
            callback: (desc, code) => {
                if(code == 0){
                    that.setState(Object.assign({}, this.state, {
                        showQR: true
                    }))
                }else{
                    actions.alert({
                        title: '提示',
                        desc: desc,
                        btns: [{
                            text: '关闭'
                        }]
                    })
                }
            }
        })

    }
    syncClick(){
        const { actions, mps, isLogin, docid } = this.props
        if(!isLogin){
            return this.onClickLogin()
        }else if(!mps || mps.length == 0){
            actions.getUserWxMps()
        }
        if(!docid){
            var that = this
            actions.alert({
                title: '提示',
                desc: '文章未保存',
                btns: [{
                    text: '保存',
                    click: (close) => {
                        close()
                        setTimeout(function(){
                            that.save()
                        })
                    }
                },{
                    text: '关闭',
                }]
            })
            return
        }
        this.setState(Object.assign({}, this.state, {
            showMps: true
        }))
    }
    closeMp(){
        this.setState(Object.assign({}, this.state, {
            showMps: false,
            mpschecked: []
        }))
    }
    selectMp(idx){
        var mpschecked = this.state.mpschecked.slice(0)
        mpschecked[idx] = !mpschecked[idx]
        this.setState(Object.assign({}, this.state, {
            mpschecked
        }))
    }
    confirmMp(confirm){
        var that = this
        const { mps, actions, docid} = this.props
        const { mpschecked } = this.state
        var appids = mpschecked.map((x, idx) => x !== false ? idx : false).filter(x => x!==false).map(idx => mps[idx].appid)
        if(appids.length == 0){
            return actions.alert({
                title: '提示',
                desc: '您还没有添加公众号',
                btns: [{
                    text: '关闭'
                }]
            })
        }
        if(confirm !== true){
            return actions.alert({
                title: '提示',
                desc: '这会直接将文章在公众号群发，请注意！',
                btns: [{
                    text: '群发',
                    click: (close) => {
                        close()
                        that.confirmMp(true)
                    }
                },{
                    text: '关闭'
                }]
            })
        }
        actions.syncPost2Mp({
            appids,
            docid,
            callback: (msg, ret) => {
                var showMps = true
                if(!ret){
                    showMps = false
                }
                return actions.alert({
                    title: '提示',
                    desc: msg,
                    btns: [{
                        text: '关闭'
                    }]
                })
            }
        })
    }
    preview(){
        const {content, actions, docid} = this.props
        const { title, author, summary, cover } = this.state
        var that = this
        actions.previewPost({
            content,
            callback: () => {
                that.setState(Object.assign({}, this.state, {
                    showQR: true
                }))
            }
        })
    }
    addColor(color){
        var colors = this.state.colors.filter(c => (c!==color))
        colors.unshift(color)
        this.setState(Object.assign({}, this.state, {
            colors: [...colors]
        }))
    }
    componentWillReceiveProps(nextProps) {
        if(!nextProps.replace){
            this.replace =false
            return
        }
        if(this.replace){
            return
        }
        this.replace = true
        this.setState(Object.assign({}, this.state, {
            title: nextProps.title,
            author: nextProps.author,
            summary: nextProps.summary,
            cover:nextProps.cover
        }))
    }
    componentDidMount() {
        const {actions, isLogin, mps} = this.props
        const {docid, type} = this.props.location.query
        if(docid && type){
            actions.getPostById({docid, type})
        }
        if(isLogin && !mps){
            actions.getUserWxMps()
        }
    }
    render() {
        const { content, update, replace, docid, url, username, mps, isLogin, isFetching } = this.props
        const { title, author, cover, summary, showLogin, output, showQR, showMps, mpschecked } = this.state
        const myRoute = this.props.route.myRoute
        const attr = ({
            Images:{
                setCover:this.setCover,
                onClickLogin: this.onClickLogin,
                output
            },
            Common:{
                id:this.props.params.id,
                colors: this.state.colors,
                addColor: this.addColor
            }
        })[myRoute]
        const MyRoute = ({
            Import,
            Common,
            Images
        })[myRoute]
        const qrimg = '/it/qrcode?string=' + encodeURIComponent(url)
        return (
            <div data-reactroot style={ {width: "100%", height: "100%"} }>
                <Header onClickLogin={this.onClickLogin}></Header>
                <div className="container-editor clear">
                    <Menu></Menu>
                    <MyRoute {...attr}></MyRoute>
                    <TextArea colors={this.state.colors} addColor={this.addColor} preview={this.preview} content={ content } update={ update } replace={ replace } syncContent={ this.syncContent } onClick={ this.onClick }></TextArea>
                </div>
                <InfoSide
                    title={ title }
                    author={ author }
                    summary={ summary }
                    cover={ cover }
                    content={ content }
                    save={ this.save }
                    sync={ this.syncClick }
                    change={ this.change }
                    addCover={ this.addCover }
                    isLogin={ isLogin }
                    login={ this.onClickLogin }
                ></InfoSide>
                <Animate
                    component=""
                    transitionName="fade"
                    showProp="data-show">
                        { showLogin ? <Login
                            data-show = {showLogin}
                            isLogin = {!!username }
                            close = { this.onClickClose }
                            login = { this.login }
                            > </Login> : null
                        }
                </Animate>
                <Animate
                    component=""
                    transitionName="fade"
                    showProp="data-show">
                    {
                        showQR && url ? <Qrcode data-show={showQR && url} qrimg={qrimg} url={url} close={this.closeQr}></Qrcode> : null
                    }
                </Animate>
                <Animate
                    component=""
                    transitionName="fade"
                    showProp="data-show">
                    {
                        showMps ? <Mp data-show={showMps} selectMp={this.selectMp} checked={mpschecked} mps={ mps } close={this.closeMp} confirm={this.confirmMp}></Mp> : null
                    }
                </Animate>
                <Alert></Alert>
                { isFetching ? <div className="loading-a"><Loading></Loading></div> : null }
            </div>
        )
    }
}
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../actions'

function mapStateToProps(state) {
    return {
        content: state.post.content,
        title: state.post.title,
        docid: state.post.docid,
        author: state.post.author,
        summary: state.post.summary,
        cover: state.post.cover,
        isSaved: state.post.isSaved,
        update: state.post.update,
        url: state.post.url,
        postSyncError: state.post.postSyncError,
        replace: state.post.replace,
        username: state.user.username,
        isLogin: !!state.user.username,
        mps: state.user.mps,
        isFetching: state.user.isFetching || state.post.isFetching || state.posts.isFetching || state.styles.isFetching || state.images.isFetching
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
)(Editor)
