import createAction from './createAction'
import {SELECT_PIC, SELECT_PICS_CANCEL, SELECT_PICS_CONFIRM, REQUEST} from '../constants'

export const selectPic = createAction(SELECT_PIC, REQUEST)
export const selectPicCancel = createAction(SELECT_PICS_CANCEL)
export const selectPicConfirm = createAction(SELECT_PICS_CONFIRM)
