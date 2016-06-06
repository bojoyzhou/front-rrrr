import { handleActions } from 'redux-actions'
import { createReducer, assign } from './createReducer'

/**
 * 导入当前reduce的常量
 *
 */
import {
        EDIT_INIT,
        EDIT_VALUE,
        EDIT_INSERT,
        SELECT_COVER,
        SAVE_CONTENT,
        CHANGE_SIDEINFO,
        PRE_VIEW,
        CLOSE_PRE_VIEW,
        SHOW_TOOLS,
        HIDE_TOOLS,
        DELETE_LINE,
        NEWLINE_PRE,
        NEWLINE_AFT,
        ALIGN_LEFT,
        ALIGN_CENTER,
        ALIGN_RIGHT,
    } from '../constants'

/**
 * 定义默认的state
 *
*/
const initialState = {
    content: '',
    ue: '',
    title: '',
    author: '',
    summary: '',
    cover: '',
    id: '',
    preview: '',
    showTips: false,
    offset: {
        left: 0,
        top: 0
    },
    elem: null,
    menuType: 'SECTION',
    rawUrl: ''
}

export default createReducer({
    [ SAVE_CONTENT ]: {
        preload: (action, state) => {
            const data = assign(state, {
                uid: 2,
                pics: state.cover,
                ue: ''
            })
            return {
                url: '/api/userwordssave',
                data,
                type: 'POST',
                dataType: 'json'
            }
        },
        success: (result, state) => (assign(state, {
            id: result.docid
        }))
    },
    [ PRE_VIEW ]: {
        preload: (action, state) => {
            return {
                url: '/api/qrcode',
                data:{
                    qr: makePost(action.payload)
                },
                type: 'POST',
                dataType: 'json'
            }
        },
        success: (result, state, action) => (assign(state, {
            preview: result.url,
            rawUrl: makePost(action.payload)
        }))
    },
    [ CLOSE_PRE_VIEW ]: (state, action) => (assign(state, {
        preview: '',
        rawUrl: ''
    })),
    [ SELECT_COVER ]: (state, action) => (assign(state, {
        cover: makeHost(action.payload)
    })),
    [ CHANGE_SIDEINFO ]: (state, action) => (assign(state, {
        [action.payload.name]: action.payload.value
    })),
    [ EDIT_INIT ]: (state, action) => {
        const ue = action.payload.ue
        ue.ready(action.payload.ready)
        return assign(state, {
            ue
        })
    },
    [ EDIT_VALUE ]: (state, action) => (assign(state, {
        content: state.ue.getContent()
    })),
    [ EDIT_INSERT ]: (state, action) => {
        state.ue.execCommand('insertHtml', action.payload)
        return assign(state, {
            content: state.ue.getContent()
        })
    },
    [ SHOW_TOOLS ]: (state, action) => {
        state.elem && (state.elem.style.border = 'none')
        action.payload.elem.style.border = '#fe9a5f dashed 1px'
        return assign(state, {
            offset: {
                ...action.payload.offset
            },
            showTips: true,
            elem: action.payload.elem,
            menuType: action.payload.elem.tagName.toUpperCase()
        })
    },
    [ HIDE_TOOLS ]: (state, action) => {
        state.elem && (state.elem.style.border = 'none')
        return assign(state, {
            showTips: false,
            elem: null
        })
    },
    [ DELETE_LINE ]: (state, action) => {
        action.payload.hook(state)
        return state
    },
    [ NEWLINE_PRE ]: (state, action) => {
        action.payload.hook(state)
        return state
    },
    [ NEWLINE_AFT ]: (state, action) => {
        action.payload.hook(state)
        return state
    },
    [ ALIGN_LEFT ]: (state, action) => {
        action.payload.hook(state)
        return state
    },
    [ ALIGN_CENTER ]: (state, action) => {
        action.payload.hook(state)
        return state
    },
    [ ALIGN_RIGHT ]: (state, action) => {
        action.payload.hook(state)
        return state
    }
}, initialState)

function makeHost(url){
    return 'http://imgs.8zcloud.com' + url
}

function makePost(docid){
    return 'http://www.8zcloud.com/doc/' + docid
}
