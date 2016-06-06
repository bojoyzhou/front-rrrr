import createAction from './createAction'
import {
        EDIT_INSERT,
        EDIT_VALUE,
        EDIT_INIT,
        SELECT_COVER,
        SAVE_CONTENT,
        CHANGE_SIDEINFO,
        PRE_VIEW,
        CLOSE_PRE_VIEW,
        SHOW_TOOLS,
        HIDE_TOOLS,
        DELETE_LINE,
        NEWLINE_PRE,
        NEWLINE_AFT,
        ALIGN_LEFT,
        ALIGN_CENTER,
        ALIGN_RIGHT,
        REQUEST,
        RAW,
    } from '../constants'
export const insertEditor = createAction(EDIT_INSERT)
export const getContent = createAction(EDIT_VALUE)
export const initEditor = createAction(EDIT_INIT, RAW)
export const selectCover = createAction(SELECT_COVER)
export const saveContent = createAction(SAVE_CONTENT, REQUEST)
export const changeSideInfo = createAction(CHANGE_SIDEINFO)
export const preView = createAction(PRE_VIEW, REQUEST)
export const closePreView = createAction(CLOSE_PRE_VIEW, REQUEST)
export const deleteLine = createAction(DELETE_LINE)
export const newLinePre = createAction(NEWLINE_PRE)
export const newLineAft = createAction(NEWLINE_AFT)
export const showTools = createAction(SHOW_TOOLS)
export const hideTools = createAction(HIDE_TOOLS)
export const imgAlignLeft = createAction(ALIGN_LEFT)
export const imgAlignCenter = createAction(ALIGN_CENTER)
export const imgAlignRight = createAction(ALIGN_RIGHT)
