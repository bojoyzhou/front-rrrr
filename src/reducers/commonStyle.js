import { handleActions } from 'redux-actions'
import { createReducer } from './createReducer'

/**
 * 导入当前reduce的常量
 *
 */
import { GET_COMMON_STYLE } from '../constants'
const type = GET_COMMON_STYLE

/**
 * 定义默认的state
 *
*/
const initialState = {
    styleHtml: []
}

export default createReducer({
    [ GET_COMMON_STYLE ]: {
        preload: (action) => ({
            url: '/api/pluginpager?stype=' + action.payload.stype,
            dataType: 'json'
        }),
        success: (result) => ({
            styleHtml: result.list
        })
    }
}, initialState)
