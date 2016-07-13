import createAction, { createActionAsync } from './createAction'
import * as constants from '../constants'

export const getPostByUrl = createActionAsync(constants.POST_GET_BY_URL, (url) => {
    return fetch(`/api/load-url?url=${encodeURIComponent(url)}`, {
        credentials: 'include'
    })
}, (json) => {
    json.result.content = json.result.content.reduce(function(a, b) {
        if (b.text) {
            return a + `<p>${b.text}</p>`
        } else if (b.img) {
            return a + `<p><img src="${b.img}" alt="" /></p>`
        }
        return a
    }, '')
    return json
})
export const getPostById = createActionAsync(constants.POST_GET_BY_ID, ({docid, type='pub'}) => {
    return fetch(`/api/getwordsingle?type=${type}&docid=${docid}`, {
        credentials: 'include'
    })
}, (json, {docid, type='pub'}) => {
    if(type == 'pub'){
        json.data.docid = ''
    }
    json.t = Date.now()
    return json
})
export const savePost = createActionAsync(constants.POST_SAVE, (fields) => {
    let data = new FormData()
    Object.keys(fields).forEach(name => {
        data.append(name, fields[name])
    })
    let url = '/api/userwordssave'
    if (fields.docid) {
        url = '/userwords/modify'
    }
    return fetch(url, {
        credentials: 'include',
        body: data,
        method: 'POST'
    })
}, (json, fields) => {
    if (!json.docid) {
        json.docid = fields.docid
    }
    return json
})
export const previewPost = createActionAsync(constants.POST_PREVIEW, (content) => {
    let data = new FormData()
    data.append('content', content)
    return fetch('/api/preview', {
        credentials: 'include',
        body: data,
        method: 'POST'
    })
})

export const insertInto = createAction(constants.POST_INSERT)
export const setContent = createAction(constants.POST_SET)
