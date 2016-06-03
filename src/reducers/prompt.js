import { handleActions } from 'redux-actions'
import { createReducer, assign } from './createReducer'

/**
 * 导入当前reduce的常量
 *
 */
import { SHOW_PROMPT, HIDE_PROMPT } from '../constants'

/**
 * 定义默认的state
 *
*/
const initialState = {
    show: true,
    message: '默认消息'
}

export default createReducer({
    [ SHOW_PROMPT ]: (state, action) => (assign(state, {
        show: true,
        message: action.payload
    })),
    [ HIDE_PROMPT ]: (state, action) => (assign(state, {
        show: false,
        message: ''
    }))
}, initialState)
