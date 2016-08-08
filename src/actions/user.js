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
}, (json, payload) => {
    payload.callback(json)
    return json
})
export const getUserName = createActionAsync(constants.USER_GETCURRENT, () => {
    return fetch(`/api/getcurrentuser`, {
        credentials: 'include'
    })
})
export const getUserWxMps = createActionAsync(constants.USER_GETWXMPS, () => {
    return fetch(`/auth/getwxauthpager`, {
        credentials: 'include'
    })
}, json => {
    return json.list.filter(x => x.verify_type_info != -1)
})
