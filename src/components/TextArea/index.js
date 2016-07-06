import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { history } from '../../utils'
import edui from './edui.css'
import style from './style.css'

class TextArea extends Component {
    constructor(props, context) {
        super(props, context)
        this.onClick = this.onClick.bind(this)
        this.deleteContent = this.deleteContent.bind(this)
        this.state = {
            showTools: null,
            offset: {
                left: 0,
                top: 0
            }
        }
    }
    componentDidMount(){
        var that = this
        var ready = this.ready.bind(this)
        setTimeout(() => {
            const ue = UE.getEditor('editor')
            that.ue = ue
            ue.ready(ready)
        }, 300)
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    handleCommand(type){
        const elem = this.elem
        if(type == 'DELETE_LINE'){
            elem.parentNode.removeChild(elem)
            setTimeout(this.hideTools())
        }else if(type == 'NEWLINE_PRE'){
            const br = document.createElement('br')
            elem.parentNode.insertBefore(br, elem)
        }else if(type == 'NEWLINE_AFT'){
            const br = document.createElement('br')
            const parent = elem.parentNode
            if(parent.lastChild == elem){
                parent.appendChild(br)
            }else{
                parent.insertBefore(br, elem.nextSibling)
            }
        }else if(type == 'ALIGN_LEFT'){
            this.ue.execCommand('imagefloat', 'left')
        }else if(type == 'ALIGN_CENTER'){
            this.ue.execCommand('imagefloat', 'center')
        }else if(type == 'ALIGN_RIGHT'){
            this.ue.execCommand('imagefloat', 'right')
        }
    }
    onClick(e){
        let elem = e.target.closest('.bazaEditor')
        let show = false
        if(elem){
            show = true
        }else{
            elem = e.target
            if(elem.tagName.toUpperCase() == 'IMG'){
                show = true
                history.push('/editor/images');
            }
        }
        this.elem && (this.elem.style.border = '0')
        if(show){
            this.elem = elem
            this.elem.style.border = '#fe9a5f dashed 1px'
            const elemOffset = getOffset(elem)
            this.showTools(elem.tagName.toUpperCase(), {
                left: elemOffset.left + editor.offsetLeft,
                top: elemOffset.top + elem.offsetHeight + 77
            })
        }else{
            this.hideTools()
        }
        function getOffset(elem, left = 0, top = 0){
            left = elem.offsetLeft || 0 + left
            top = elem.offsetTop || 0 + top
            if(elem.parentNode){
                return getOffset(elem.parentNode, left, top)
            }
            return { left, top }
        }
        this.props.onClick(e)
    }
    showTools(menuType, offset){
        this.setState(Object.assign({}, this.state, {
            showTools:menuType,
            offset
        }))
    }
    hideTools(){
        this.setState(Object.assign({}, this.state, {
            showTools:false
        }))
        this.elem && (this.elem.style.border = '0')
    }
    ready() {
        const {ue, uereadycall} = this
        const { onClick, syncContent } = this.props
        let that = this
        ue.document.addEventListener('click', this.onClick)
        setTimeout(() => {
            const html = ue.execCommand('getlocaldata')
            ue.execCommand('insertHtml', html)
            uereadycall && uereadycall.map(ready => ready())

            that.interval = setInterval(()=>{
                syncContent(that.ue.getContent())
            }, 500)
        }, 300)
    }
    deleteContent() {
        this.ue.execCommand('cleardoc')
    }
    preview() {
        // const { actions } = this.props
        // actions.tempSave()
    }
    componentWillReceiveProps(nextProps) {
        const ue = this.ue
        if(!ue){
            this.uereadycall = this.uereadycall || []
            this.uereadycall.push(() => {
                this.componentWillReceiveProps(nextProps)
            })
            return
        }
        if (this.update != nextProps.update) {
            nextProps.update((html) => {
                try { ue.execCommand('insertHtml', html) } catch (e) {
                    console.error(e)
                    //ueditory有时候会报错，这里做一些捕捉，防止影响下面的功能
                }
            })
            this.update = nextProps.update
        }
        if (nextProps.replace && !this.replace) {
            ue.execCommand('cleardoc')
            ue.execCommand('insertHtml', nextProps.content)
        }
        this.replace = nextProps.replace
    }
    render() {
        const { update } = this.props
        const {showTools, menuType, offset} = this.state
        return (
            <div className="container-textarea">
                <div>
                    <script id="editor" type="text/plain" width="500"></script>
                    <ul className="float-bar">
                        <li onClick={this.props.preview} className="float-item preview"></li>
                        <li onClick={this.deleteContent} className="float-item delete"></li>
                    </ul>
                </div>
                {
                    showTools ?
                        <div style={ offset } className="tips">
                            <div className="tips-btn" onClick={() => { this.handleCommand('DELETE_LINE') } }>删除</div>
                            <div className="tips-btn" style={{ display: showTools == 'SECTION' ? 'block' : 'none' }} onClick={() => { this.handleCommand('NEWLINE_PRE') } }>前空行</div>
                            <div className="tips-btn" style={{ display: showTools == 'SECTION' ? 'block' : 'none' }} onClick={() => { this.handleCommand('NEWLINE_AFT') } }>后空行</div>
                            <div className="tips-btn" style={{ display: showTools == 'IMG' ? 'block' : 'none' }} onClick={() => { this.handleCommand('ALIGN_LEFT') } }>左对齐</div>
                            <div className="tips-btn" style={{ display: showTools == 'IMG' ? 'block' : 'none' }} onClick={() => { this.handleCommand('ALIGN_CENTER') } }>居中</div>
                            <div className="tips-btn" style={{ display: showTools == 'IMG' ? 'block' : 'none' }} onClick={() => { this.handleCommand('ALIGN_RIGHT') } }>右对齐</div>
                        </div>
                        : null
                }
            </div>
        )
    }
}

TextArea.propTypes = {
    update: PropTypes.func.isRequired,
    syncContent: PropTypes.func.isRequired,
    onClick:PropTypes.func.isRequired,
    replace:PropTypes.bool.isRequired,
    preview:PropTypes.func.isRequired,
    content:PropTypes.string.isRequired,
}
export default TextArea
