import createAction from './createAction'
import {EDIT_INSERT, EDIT_VALUE, EDIT_INIT, REQUEST} from '../constants'

export const insertEditor = createAction(EDIT_INSERT)
export const getContent = createAction(EDIT_VALUE)
export const initEditor = createAction(EDIT_INIT)
