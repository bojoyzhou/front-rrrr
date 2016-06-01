import { handleActions } from 'redux-actions'
import { createReducer, assign } from './createReducer'

/**
 * 导入当前reduce的常量
 *
 */
import { EDIT_INIT, EDIT_VALUE, EDIT_INSERT } from '../constants'

/**
 * 定义默认的state
 *
*/
const initialState = {
    content: '',
    ue: ''
}

export default createReducer({
    // [ EDIT_INIT ]: {
    //     preload: (action, state) => ({
    //         url: //data
    //         dataType: //data
    //     }),
    //     success: (result, state) => ({
    //         //return data
    //     })
    // },
    [ EDIT_INIT ]: (state, action) => (assign(state, {
        ue: action.payload
    })),
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
