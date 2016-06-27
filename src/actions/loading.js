import createAction from './createAction'
import {SHOW_LOADING, HIDE_LOADING, REQUEST} from '../constants'

export const showLoading = createAction(SHOW_LOADING)
export const hideLoading = createAction(HIDE_LOADING)
