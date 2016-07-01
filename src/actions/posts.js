import {createActionAsync} from './createAction'
import * as constants from '../constants'

export const loadPosts =  createActionAsync(constants.POST_LOAD, () => {
    return fetch(`/api/collectpager`, {
        credentials: 'include'
    })
})
