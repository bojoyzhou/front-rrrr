import createAction, { createActionAsync } from './createAction'
import * as constants from '../constants'
export const alert = createAction(constants.ALERT_SHOW)
export const closeAlert = createAction(constants.ALERT_CLOSE)
