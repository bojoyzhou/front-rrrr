import { handleActions } from 'redux-actions'
import { createReducer, assign } from './createReducer'
import actions from '../actions'

/**
 * 导入当前reduce的常量
 *
 */
import { GET_OPTION_POST_LIST, GET_POST_DETAIL, IMPORT_CONTENT } from '../constants'

/**
 * 定义默认的state
 *
*/
const initialState = {
    importUrl: '',
    content: '',
    posts: [],
    showAlert: false
}

export default createReducer({
    [ GET_OPTION_POST_LIST ]: {
        preload: (action) => ({
            url: '/api/collectpager',
            dataType: 'json'
        }),
        success: (result, state) => (assign(state, {
            posts: result.list || []
        }))
    },
    [ GET_POST_DETAIL ]: {
        preload: (action) => ({
            url: '/api/getwordsingle',
            data: {
                type:'pub',
                docid: action.payload.docid
            },
            dataType: 'json'
        }),
        success: (result, state) => {
            return assign(state, {
                content: result.data.content
            })
        }
    },
    [ IMPORT_CONTENT ]: {
        preload: (action) => ({
            url: '/api/load-url',
            data: {
                url: action.payload.url
            },
            dataType: 'json'
        }),
        success: (result, state) => {
            return assign(state, {
                content: result.result.content.map((item) => {
                    if(item.text){
                        return '<p>' + item.text + '</p>'
                    }else if(item.img){
                        return '<p><img src="'+ item.img +'"></p>'
                    }
                }).join(''),
                showAlert: true
            })
        }
    }

}, initialState)
