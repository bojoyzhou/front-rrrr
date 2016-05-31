import createAction from './createAction'
import {SELECT_PIC, SELECT_PICS_CANCEL, SELECT_PICS_CONFIRM, SELECT_PICS_OPEN, PICK_PIC, REQUEST} from '../constants'

export const selectPic = createAction(SELECT_PIC)
export const selectPicCancel = createAction(SELECT_PICS_CANCEL)
export const selectPicConfirm = createAction(SELECT_PICS_CONFIRM)
export const selectPicOpen = createAction(SELECT_PICS_OPEN)
export const pickPic = createAction(PICK_PIC)
