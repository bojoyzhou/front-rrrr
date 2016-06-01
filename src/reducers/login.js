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
    FORGOT_DIALOG,
    LOGIN_DATA_CHANGE
} from '../constants'

/**
 * 定义默认的state
 *
 */
const initialState = {
    isOpened: false,
    status: LOGIN_DIALOG,
    data: {
        uname: '',
        email: '',
        password: '',
        repassword: '',
        vcode: ''
    }
}

export default createReducer({
    [OPEN_LOGIN_DIALOG]: (state, action) => (assign(state, {
        isOpened: true,
        status: LOGIN_DIALOG
    })),
    [CLOSE_LOGIN_DIALOG]: (state, action) => (assign(state, {
        isOpened: false
    })),
    [OPEN_REGIST_DIALOG]: (state, action) => (assign(state, {
        isOpened: true,
        status: REGIST_DIALOG
    })),
    [OPEN_FORGOT_DIALOG]: (state, action) => (assign(state, {
        isOpened: true,
        status: FORGOT_DIALOG
    })),
    [LOGIN_DATA_CHANGE]: (state, action) => (assign(state, {
        data: assign(state.data, {
            [action.payload.name]: action.payload.value
        })
    })),
    [DO_LOGIN]: {
        preload: (action, state) => ({
            url: '/api/login',
            dataType: 'json',
            type: 'POST',
            data: {
                email: state.data.email,
                pwd2: state.data.password,
                vcode: state.data.vcode
            }
        }),
        success: (result, state) => {
            console.log(result)
            return state
        }
    },
    [DO_REGIST]: {
        preload: (action, state) => ({
            url: '/api/reg',
            dataType: 'json',
            type: 'POST',
            data: {
                uname: state.data.uname,
                email: state.data.email,
                pwd1: state.data.password,
                pwd2: state.data.repassword,
                vcode: state.data.vcode
            }
        }),
        success: (result, state) => {
            console.log(result)
            return state
        }
    },
    [DO_FORGOT]: {
        preload: (action, state) => ({
            url: '/#',
            dataType: 'json'
        }),
        success: (result, state) => ({
            posts: result.list
        })
    },
}, initialState)
