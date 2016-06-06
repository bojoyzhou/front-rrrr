import createAction from './createAction'
import {
        OPEN_LOGIN_DIALOG,
        CLOSE_LOGIN_DIALOG,
        OPEN_REGIST_DIALOG,
        OPEN_FORGOT_DIALOG,
        DO_LOGIN,
        DO_REGIST,
        DO_FORGOT,
        LOGIN_DATA_CHANGE,
        REGIST_DIALOG_1,
        CHECK_VCODE,
        REQUEST,
        CHANGE_VCODE
    } from '../constants'


export const openLoginDialog = createAction(OPEN_LOGIN_DIALOG)
export const closeLoginDialog = createAction(CLOSE_LOGIN_DIALOG)
export const openRegistDialog = createAction(OPEN_REGIST_DIALOG)
export const openForgotDialog = createAction(OPEN_FORGOT_DIALOG)
export const doLogin = createAction(DO_LOGIN, REQUEST)
export const doRegist = createAction(DO_REGIST, REQUEST)
export const doForgot = createAction(DO_FORGOT, REQUEST)
export const loginDataChange = createAction(LOGIN_DATA_CHANGE)
export const registNext = createAction(REGIST_DIALOG_1)
export const checkVcode = createAction(CHECK_VCODE, REQUEST)
export const changeVcode = createAction(CHANGE_VCODE)
