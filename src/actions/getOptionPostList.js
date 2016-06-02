import createAction from './createAction'
import {GET_OPTION_POST_LIST, GET_POST_DETAIL, IMPORT_CONTENT, REQUEST} from '../constants'

export const getOptionPostList =createAction(GET_OPTION_POST_LIST, REQUEST)
export const getPostDetail =createAction(GET_POST_DETAIL, REQUEST)
export const importContent =createAction(IMPORT_CONTENT, REQUEST)
