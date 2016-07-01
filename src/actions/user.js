import { createActionAsync } from './createAction'
import * as constants from '../constants'
import fetch from 'isomorphic-fetch'

export const userLogin = createActionAsync(constants.USER_LOGIN, (payload) => {
    var data = new FormData()
    for (var i in payload) {
        data.append(i, payload[i])
    }
    return fetch(`/api/login`, {
        credentials: 'include',
        method: 'post',
        body: data
    })
})
export const getUserName = createActionAsync(constants.USER_GETCURRENT, () => {
    return fetch(`/api/getcurrentuser`, {
        credentials: 'include'
    })
})
