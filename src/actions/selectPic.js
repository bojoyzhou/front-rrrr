import createAction from './createAction'
import {GET_USER_PICS, SELECT_PIC, SELECT_PICS_CANCEL, SELECT_PICS_CONFIRM, SELECT_PICS_OPEN, PICK_PIC, DELETE_PIC, REQUEST} from '../constants'

export const selectPic = createAction(SELECT_PIC)
export const selectPicCancel = createAction(SELECT_PICS_CANCEL)
export const selectPicConfirm = createAction(SELECT_PICS_CONFIRM, REQUEST)
export const selectPicOpen = createAction(SELECT_PICS_OPEN)
export const pickPic = createAction(PICK_PIC)
export const getUserPics = createAction(GET_USER_PICS, REQUEST)
export const deletePic = createAction(DELETE_PIC)

