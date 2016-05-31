import createAction from './createAction'
import {OPEN_LOGIN_DIALOG, CLOSE_LOGIN_DIALOG, OPEN_REGIST_DIALOG, OPEN_FORGOT_DIALOG, DO_LOGIN, DO_REGIST, DO_FORGOT, REQUEST} from '../constants'


export const openLoginDialog = createAction(OPEN_LOGIN_DIALOG)
export const closeLoginDialog = createAction(CLOSE_LOGIN_DIALOG)
export const openRegistDialog = createAction(OPEN_REGIST_DIALOG)
export const openForgotDialog = createAction(OPEN_FORGOT_DIALOG)
export const doLogin = createAction(DO_LOGIN, REQUEST)
export const doRegist = createAction(DO_REGIST, REQUEST)
export const doForgot = createAction(DO_FORGOT, REQUEST)







