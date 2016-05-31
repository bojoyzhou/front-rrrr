import {
    handleActions
} from 'redux-actions'
import {
    createReducer,
    assign
} from './createReducer'

/**
 * 导入当前reduce的常量
 *
 */
import {
    OPEN_LOGIN_DIALOG,
    CLOSE_LOGIN_DIALOG,
    OPEN_REGIST_DIALOG,
    OPEN_FORGOT_DIALOG,
    DO_LOGIN,
    DO_REGIST,
    DO_FORGOT,
    LOGIN_DIALOG,
    REGIST_DIALOG,
    FORGOT_DIALOG
} from '../constants'

/**
 * 定义默认的state
 *
 */
const initialState = {
    isOpened: false,
    status: LOGIN_DIALOG,
    data: {
        email: '',
        password: '',
        repassword: '',
        vcode: ''
    }
}

export default createReducer({
    [OPEN_LOGIN_DIALOG]: (state, action) => (assign(state, {
        isOpened: true
    })),
    [CLOSE_LOGIN_DIALOG]: (state, action) => (assign(state, {
        isOpened: false
    })),
    [OPEN_REGIST_DIALOG]: (state, action) => ({
        ...state
    }),
    [OPEN_FORGOT_DIALOG]: (state, action) => ({
        ...state
    }),
    [DO_LOGIN]: {
        preload: (action) => ({
            url: '/#',
            dataType: 'json'
        }),
        success: (result) => ({
            posts: result.list
        })
    },
    [DO_REGIST]: {
        preload: (action) => ({
            url: '/#',
            dataType: 'json'
        }),
        success: (result) => ({
            posts: result.list
        })
    },
    [DO_FORGOT]: {
        preload: (action) => ({
            url: '/#',
            dataType: 'json'
        }),
        success: (result) => ({
            posts: result.list
        })
    },
}, initialState)