import React, { Component } from 'react'
import { Link } from 'react-router'
import { history } from '../../utils'

import style from './style.less'
import Menu from '../Menu'
import Header from '../Header'
import TextArea from '../TextArea'
import InfoSide from '../InfoSide'
import Qrcode from '../Qrcode'
import Login from '../Login'
import Prompt from '../Prompt'
import Loading from '../Loading'
import Import from '../Import'
import Common from '../Common'
import Images from '../Images'

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
        this.state = {
            title: '',
            author: '',
            summary: '',
            cover: '',
            output: 'editor',
            showLogin: '',
            showQR: false,
            qrimg: '',
            url: ''
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
        actions.userLogin(data)
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
        console.log(e)
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
        const {content, actions, docid} = this.props
        const { title, author, summary, cover } = this.state
        actions.savePost({ docid, content, title, author, summary, pics:JSON.stringify([cover]) })
        this.setState(Object.assign({}, this.state, {
            showQR: true
        }))
    }
    preview(){
        const {content, actions, docid} = this.props
        const { title, author, summary, cover } = this.state
        actions.previewPost(content )
        this.setState(Object.assign({}, this.state, {
            showQR: true
        }))
    }
    componentWillReceiveProps(nextProps) {
        if(!this.docid && !nextProps.docid || this.docid == nextProps.docid){
            this.docid = nextProps.docid
            return
        }
        this.docid = nextProps.docid
        this.setState(Object.assign({}, this.state, {
            title:nextProps.title,
            author:nextProps.author,
            summary:nextProps.summary,
            cover: nextProps.cover
        }))
    }
    componentDidMount() {
        const {actions} = this.props
        const {docid, type} = this.props.location.query
        if(docid && type){
            actions.getPostById({docid, type})
        }
    }
    render() {
        const { content, update, replace, docid, url } = this.props
        const { title, author, cover, summary, showLogin, output, showQR } = this.state
        const myRoute = this.props.route.myRoute
        const attr = ({
            Images:{
                setCover:this.setCover,
                output
            },
            Common:{
                id:this.props.params.id
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
                    <TextArea preview={this.preview} content={ content } update={ update } replace={ replace } syncContent={ this.syncContent } onClick={ this.onClick }></TextArea>
                </div>
                <InfoSide
                    title={ title }
                    author={ author }
                    summary={ summary }
                    cover={ cover }
                    content={ content }
                    save={ this.save }
                    change={ this.change }
                    addCover={ this.addCover }
                ></InfoSide>
                <Prompt></Prompt>
                <Loading></Loading>
                { showLogin ? <Login
                    isLogin = {!!username }
                    close = { this.onClickClose }
                    login = { this.login }
                    > </Login> : null
                }
                {
                    showQR && url ? <Qrcode qrimg={qrimg} url={url} close={this.closeQr}></Qrcode> : null
                }
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
        replace: state.post.replace,
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
