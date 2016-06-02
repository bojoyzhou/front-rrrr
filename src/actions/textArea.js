import createAction from './createAction'
import {EDIT_INSERT, EDIT_VALUE, EDIT_INIT, SELECT_COVER, SAVE_CONTENT, CHANGE_SIDEINFO, REQUEST} from '../constants'

export const insertEditor = createAction(EDIT_INSERT)
export const getContent = createAction(EDIT_VALUE)
export const initEditor = createAction(EDIT_INIT)
export const selectCover = createAction(SELECT_COVER)
export const saveContent = createAction(SAVE_CONTENT, REQUEST)
export const changeSideInfo = createAction(CHANGE_SIDEINFO)
