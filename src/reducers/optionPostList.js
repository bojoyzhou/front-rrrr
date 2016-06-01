import { handleActions } from 'redux-actions'
import { createReducer, assign } from './createReducer'
import actions from '../actions'

/**
 * 导入当前reduce的常量
 *
 */
import { GET_OPTION_POST_LIST, GET_POST_DETAIL, CHANGE_IMPORT_URL } from '../constants'

/**
 * 定义默认的state
 *
*/
const initialState = {
    importUrl: '',
    posts: []
}

export default createReducer({
    [ GET_OPTION_POST_LIST ]: {
        preload: (action) => ({
            url: '/api/collectpager?uid=2',
            dataType: 'json'
        }),
        success: (result, state) => (assign(state, {
            posts: result.list
        }))
    },
    [ GET_POST_DETAIL ]: {
        preload: (action) => ({
            url: 'api/collectsingle?uid=2&docid=2',
            data: {
                docid: action.payload
            },
            dataType: 'json'
        }),
        success: (result, state) => {
            actions.insertEditor(result.data.content)
            return state
        }
    },
    [ CHANGE_IMPORT_URL ]: (state, action) => (assign(state, {
        importUrl: action.payload
    }))

}, initialState)
