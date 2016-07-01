import {createActionAsync} from './createAction'
import * as constants from '../constants'

export const getPostByUrl =  createActionAsync(constants.POST_GET_BY_URL, (url) => {
    return fetch(`/api/load-url?url=${encodeURIComponent(url)}`, {
        credentials: 'include'
    })
}, (json) => {
    json.result.content = json.result.content.reduce(function(a,b){
        if(b.text){
            return a + `<p>${b.text}</p>`
        }else if(b.img){
            return a + `<p><img src="${b.img}" alt="" /></p>`
        }
        return a
    }, '')
    return json
})
export const getPostById =  createActionAsync(constants.POST_GET_BY_ID, (docid) => {
    return fetch(`/api/getwordsingle?type=pub&docid=${docid}`, {
        credentials: 'include'
    })
})
