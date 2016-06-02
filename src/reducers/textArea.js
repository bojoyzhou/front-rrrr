import { handleActions } from 'redux-actions'
import { createReducer, assign } from './createReducer'

/**
 * 导入当前reduce的常量
 *
 */
import { EDIT_INIT, EDIT_VALUE, EDIT_INSERT, SELECT_COVER, SAVE_CONTENT, CHANGE_SIDEINFO } from '../constants'

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
    cover: ''
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
        success: (result, state) => (console.log(result), {
             ...state
            //return data
        })
    },
    [ SELECT_COVER ]: (state, action) => (assign(state, {
        cover: makeHost(action.payload)
    })),
    [ CHANGE_SIDEINFO ]: (state, action) => (assign(state, {
        [action.payload.name]: action.payload.value
    })),
    [ EDIT_INIT ]: (state, action) => {
        const ue = action.payload
        ue.ready(() => {
            ue.document.addEventListener('click', (e) => {
                if(e.target.closest('.RankEditor')){
                    console.log(e)
                }
            }, false)
        })
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
    }
}, initialState)

function makeHost(url){
    return 'http://imgs.8zcloud.com' + url
}
