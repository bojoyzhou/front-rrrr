import { handleActions } from 'redux-actions'
import { createReducerSync } from './createReducer'

/**
 * 导入当前reduce的常量
 *
 */
import { UPLOAD_PIC, SELECT_PICS_CANCEL, SELECT_PICS_CONFIRM } from '../constants'
const type = UPLOAD_PIC

/**
 * 定义默认的state
 *
*/
const initialState = {
    file: [{
        url:makeHost("/upload/img/2016_05_30/124049696.png"),
        thumb:makeHost("/upload/img/2016_05_30/124049696_100_0.png")
    }]
}

/**
 * @param  {Mixed} ajax接口返回的结果
 * @return {Object} 返回一个state, 结构需同initialState一致，返回的state作为新的state,用来触发视图更新
 */
const hook = (state, action) => {
    let files = state.file.map(file => file)
    files.push({
        url: makeHost(action.payload.url),
        thumb: makeHost(action.payload.Ext['100_0'])
    })
    return {
        file: files
    }
}

function makeHost(url){
    return 'http://imgs.8zcloud.com' + url
}

/**
 * 导出模块
 */
export const selectPic = createReducerSync(type, hook, initialState)
export const selectPicCancel = createReducerSync(SELECT_PICS_CANCEL, (state, action) => {
    console.log('cancel')
    return state
},initialState)
export const selectPicConfirm = createReducerSync(SELECT_PICS_CONFIRM, (state, action) => {
    console.log('confirm')
    return state
}, initialState)
