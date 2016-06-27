import createAction from './createAction'
import {SHOW_ALERT, HIDE_ALERT, REQUEST} from '../constants'

export const showAlert = createAction(SHOW_ALERT)
export const hideAlert = createAction(HIDE_ALERT)
