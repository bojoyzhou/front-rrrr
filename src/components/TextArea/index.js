import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { history } from '../../utils'
import edui from './edui.css'
import style from './style.css'
import { getParams } from '../../utils'
import { DELETE_LINE, NEWLINE_PRE, NEWLINE_AFT, ALIGN_LEFT, ALIGN_CENTER, ALIGN_RIGHT, } from '../../constants'
import ajax from 'ajax'

class TextArea extends Component {
    componentDidMount(){
        var that = this
        setTimeout(() => {
            const ue = UE.getEditor('editor')
            that.ue = ue
        }, 300)
    }
    handleCommand(type){
        const { actions } = this.props
        const elem = this.elem
        if(type == DELETE_LINE){
            actions.deleteLine({
                hook: (state) => {
                    elem.parentNode.removeChild(elem)
                    setTimeout(actions.hideTools)
                }
            })
        }else if(type == NEWLINE_PRE){
            actions.newLinePre({
                hook: (state) => {
                    const br = document.createElement('br')
                    elem.parentNode.insertBefore(br, elem)
                }
            })
        }else if(type == NEWLINE_AFT){
            actions.newLineAft({
                hook: (state) => {
                    const br = document.createElement('br')
                    const parent = elem.parentNode
                    if(parent.lastChild == elem){
                        parent.appendChild(br)
                    }else{
                        parent.insertBefore(br, elem.nextSibling)
                    }
                }
            })
        }else if(type == ALIGN_LEFT){
            actions.imgAlignLeft({
                hook: (state) => {
                    state.ue.execCommand('imagefloat', 'left')
                }
            })
        }else if(type == ALIGN_CENTER){
            actions.imgAlignCenter({
                hook: (state) => {
                    state.ue.execCommand('imagefloat', 'center')
                }
            })
        }else if(type == ALIGN_RIGHT){
            actions.imgAlignRight({
                hook: (state) => {
                    state.ue.execCommand('imagefloat', 'right')
                }
            })
        }
    }
    ueReady(ue) {
        var that = this
        const { actions, query } = this.props
        document.body.addEventListener('click', (e) => {
            actions.hideTools()
        })
        ue.document.addEventListener('click', (e) => {
            let elem = e.target.closest('.RankEditor') || e.target.closest('.bazaEditor')
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
            if(show){
                that.elem = elem
                actions.showTools({
                    offset: {
                        left: editor.offsetLeft + 20,
                        top: elem.offsetTop + elem.offsetHeight + 65
                    },
                    elem
                })
            }else{
                actions.hideTools()
            }
        }, false)
        const {docid, type} = query
        if(docid){
            ajax({
                url: '/api/getwordsingle',
                type: 'GET',
                data:{
                    docid,
                    type
                },
                success: (result) => {
                    actions.insertEditor(result.data.content)
                    const arr = ['title', 'author', 'summary']
                    arr.map(function(name){
                        const value = result.data[name]
                        actions.changeSideInfo({
                            name,
                            value
                        })
                    })
                    const cover = result.data.pics && result.data.pics[0]
                    actions.changeSideInfo({
                        name: 'cover',
                        value: cover
                    })
                },
                dataType:'json'
            })
        }else{
            setTimeout(() => {
                const html = ue.execCommand('getlocaldata')
                actions.insertEditor(html)
            })
        }
    }
    deleteContent() {
        const { actions } = this.props
        actions.clearEditor()
    }
    preview() {
        const { actions } = this.props
        actions.tempSave()
    }
    render() {
        const {offset, showTips, menuType, content} = this.props
        const show = showTips ? 'block' : 'none'
        try{
            this.ue.execCommand('cleardoc')
            this.ue.execCommand('insertHtml', content)
        }catch(e){
            console.log(e)
        }
        return (
            <div className="container-textarea">
                <div>
                    <script id="editor" type="text/plain" width="500"></script>
                    <ul className="float-bar">
                        <li onClick={this.preview.bind(this)} className="float-item preview"></li>
                        <li onClick={this.deleteContent.bind(this)} className="float-item delete"></li>
                    </ul>
                </div>
                <div ref="tips" className="tips" style={{ display: show, ...offset }}>
                    <div className="tips-btn" onClick={() => { this.handleCommand(DELETE_LINE) } }>删除</div>
                    <div className="tips-btn" style={{ display: menuType == 'SECTION' ? 'block' : 'none' }} onClick={() => { this.handleCommand(NEWLINE_PRE) } }>前空行</div>
                    <div className="tips-btn" style={{ display: menuType == 'SECTION' ? 'block' : 'none' }} onClick={() => { this.handleCommand(NEWLINE_AFT) } }>后空行</div>
                    <div className="tips-btn" style={{ display: menuType == 'IMG' ? 'block' : 'none' }} onClick={() => { this.handleCommand(ALIGN_LEFT) } }>左对齐</div>
                    <div className="tips-btn" style={{ display: menuType == 'IMG' ? 'block' : 'none' }} onClick={() => { this.handleCommand(ALIGN_CENTER) } }>居中</div>
                    <div className="tips-btn" style={{ display: menuType == 'IMG' ? 'block' : 'none' }} onClick={() => { this.handleCommand(ALIGN_RIGHT) } }>右对齐</div>
                </div>
            </div>
        )
    }
}

TextArea.propTypes = {
    content: PropTypes.string.isRequired
}
export default TextArea
