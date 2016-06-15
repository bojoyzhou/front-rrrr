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
    REGIST_DIALOG_1,
    REGIST_DIALOG_2,
    LOGIN_DATA_CHANGE,
    CHECK_VCODE,
    CHANGE_VCODE,
    GET_USER_NAME,
    HIDE_LOGIN_DIALOG
} from '../constants'

import actions from '../actions'
/**
 * 定义默认的state
 *
 */
const initialState = {
    isOpened: false,
    display: 'none',
    status: LOGIN_DIALOG,
    step: REGIST_DIALOG_1,
    data: {
        uname: '',
        email: '',
        password: '',
        repassword: '',
        vcode: '',
        uid: ''
    },
    username: '',
    codelink: refresh()
}

function refresh(){
    const codelink = '/api/vcode'
    return codelink + '?t=' + Date.now()
}

export default createReducer({
    [CHANGE_VCODE]: (state, action) => (assign(state, {
        codelink: refresh(),
    })),
    [OPEN_LOGIN_DIALOG]: (state, action) => (assign(state, {
        isOpened: true,
        display: 'block',
        status: LOGIN_DIALOG
    })),
    [CLOSE_LOGIN_DIALOG]: (state, action) => (assign(state, {
        isOpened: false
    })),
    [HIDE_LOGIN_DIALOG]: (state, action) => (assign(state, {
        display: 'none'
    })),
    [OPEN_REGIST_DIALOG]: (state, action) => (assign(state, {
        isOpened: true,
        display: 'block',
        status: REGIST_DIALOG,
        step: REGIST_DIALOG_1
    })),
    [OPEN_FORGOT_DIALOG]: (state, action) => (assign(state, {
        isOpened: true,
        display: 'block',
        status: FORGOT_DIALOG
    })),
    [LOGIN_DATA_CHANGE]: (state, action) => (assign(state, {
        data: assign(state.data, {
            [action.payload.name]: action.payload.value
        })
    })),
    [REGIST_DIALOG_1]: (state, action) => {
        const { email, vcode } = state.data
        return assign(state, {
            step: REGIST_DIALOG_2
        })
    },
    [DO_LOGIN]: {
        preload: (action, state, dispatch) => {
            return {
                url: '/api/login',
                data: {
                    pwd: state.data.password,
                    email: state.data.email,
                    vcode: state.data.vcode
                },
                dataType: 'json',
                type: 'POST'
            }
        },
        success: (result, state) => (assign(state, {
            isOpened: false,
            username: result.uInfo.uname
        }))
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
            return assign(state, {
                data: assign(state.data, {
                    uid: result.uid
                })
            })
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
    [CHECK_VCODE]: {
        preload: (action, state) => ({
            url: '/api/checkvcode',
            data: {
                vcode: action.payload.vcode
            },
            dataType: 'json'
        }),
        success: (result, state) => (state)
    },
    [GET_USER_NAME]: {
        preload: (action, state) => ({
            url: '/api/getcurrentuser',
            dataType: 'json'
        }),
        success: (result, state) => (assign(state, {
            username: result.uInfo && result.uInfo.uname
        }))
    },
}, initialState)
