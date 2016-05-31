import { handleActions } from 'redux-actions'
import { createReducer } from './createReducer'

/**
 * 导入当前reduce的常量
 *
 */
import { GET_USER_PICS } from '../constants'

/**
 * 定义默认的state
 *
*/
const initialState = {
    pics: [
        // {
        //     pic: '',
        //     thumb: ''
        // }
    ]
}

export default createReducer({
    [ GET_USER_PICS ]: {
        preload: (action) => ({
            url:'/api/getuserpics',
            data:{
                uid:2
            },
            dataType:'json'
        }),
        success: (result) => ({
            pics: result.list
        })
    }
}, initialState)
