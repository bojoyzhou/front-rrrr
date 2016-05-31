import { handleActions } from 'redux-actions'
import { createReducer } from './createReducer'

/**
 * 导入当前reduce的常量
 *
 */
import { GET_OPTION_POST_LIST } from '../constants'

/**
 * 定义默认的state
 *
*/
const initialState = {
    posts: []
}

export default createReducer({
    [ GET_OPTION_POST_LIST ]: {
        preload: (action) => ({
            url:'/api/collectpager?uid=2',
            dataType:'json'
        }),
        success: (result) => ({
            posts: result.list
        })
    }
}, initialState)
