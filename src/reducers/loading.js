import { handleActions } from 'redux-actions'
import { createReducer, assign } from './createReducer'

/**
 * 导入当前reduce的常量
 *
 */
import { SHOW_LOADING, HIDE_LOADING } from '../constants'

/**
 * 定义默认的state
 *
*/
const initialState = {
    show: false
}

export default createReducer({
    [ SHOW_LOADING ]: (state, action) => (assign(state, {
        show: true
    })),
    [ HIDE_LOADING ]: (state, action) => (assign(state, {
        show: false
    }))
}, initialState)
