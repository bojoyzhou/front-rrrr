import { handleActions } from 'redux-actions'
import { createReducer } from './createReducer'

/**
 * 导入当前reduce的常量
 *
 */
import { GET_USER_PICS } from '../constants'
const type = GET_USER_PICS

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
/**
 * @param  {Object} redux触发的action对象
 * @return {Object} 即将发起ajax调用的ajax的选项
 */
const options = (action) => {
    return {
        url:'/api/getuserpics',
        data:{
            uid:2
        },
        dataType:'json'
    }
}

/**
 * @param  {Mixed} ajax接口返回的结果
 * @return {Object} 返回一个state, 结构需同initialState一致，返回的state作为新的state,用来触发视图更新
 */
const hook = (result) => {
    return {
        pics: result.list
    }
}

/**
 * 导出模块
 */
export default createReducer(type, options, hook, initialState)
