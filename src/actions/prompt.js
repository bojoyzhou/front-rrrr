import createAction from './createAction'
import {SHOW_PROMPT, HIDE_PROMPT, REQUEST} from '../constants'

export const showPrompt = createAction(SHOW_PROMPT)
export const hidePrompt = createAction(HIDE_PROMPT)
