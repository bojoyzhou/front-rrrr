import createAction, {
    createActionAsync
} from './createAction'
import * as constants from '../constants'

export const loadImages = createActionAsync(constants.IMAGES_GET, (id) => {
    return fetch(`/api/getuserpics`, {
        credentials: 'include'
    })
}, (json) => {
    return json.list.map(pic => ({ id: pic.id, url: pic.pic, thumb: pic.thumb }))
})
export const upload = createActionAsync(constants.UPLOAD, (file) => {
    var data = new FormData()
    var field = 'file'
    var type = 1
    if(file.files.length > 1){
        field = 'file[]'
        type = 2
    }
    Array.prototype.forEach.call(file.files, f => {
        data.append(field, f)
    })
    return fetch(`http://imgs.i8za.com/getfiles.php?thumb=250_0&type=${type}`, {
    // return fetch(`http://120.25.80.132:88/getfiles.php?thumb=250_0`, {
        method: 'POST',
        body: data
    })
}, (json, payload) => {
    var data,
        arr = [],
        i=0
    while(data = json[i++]){
        data = data.data
        arr.push({
            thumb: makeHost(data.Ext['250_0']),
            url: makeHost(data.url)
        })
    }
    if(i == 1){
        data = json.data
        arr.push({
            thumb: makeHost(data.Ext['250_0']),
            url: makeHost(data.url)
        })
    }
    return arr
})
export const saveImage = createActionAsync(constants.IMAGES_SAVE, (picked) => {
    var json = picked.map(pic => ({
        img: pic.url,
        "img_100": pic.thumb
    }))
    var data = new FormData()
    data.append('param', JSON.stringify(json))
    return fetch(`/api/userpicssave`, {
        method: 'POST',
        body: data,
        credentials: 'include'
    })
}, (json, picked) => {
    var ret = picked.map((pic, idx) => {
        return {
            ...pic,
            id: json.list[idx]
        }
    })
    return ret
})
export const deleteImage = createActionAsync(constants.IMAGES_DEL, (id) => {
    var data = new FormData()
    data.append('id', id)
    return fetch(`/api/userpicsdel`, {
        method: 'POST',
        body: data,
        credentials: 'include'
    })
}, (json, id) => {
    json.id = id
    return json
})
export const renderImage = createAction(constants.IMAGES_RENDER)
export const searchImage = createActionAsync(constants.IMAGES_SEARCH, ({ keyword, pn }) => {
    return fetch(`/api/image-search?keyword=${keyword}&pn=${pn}&rn=20`)
}, (json, { pn }) => {
    var list = json.result.map(pic => ({ id: makeId(), url: pic.url, thumb: pic.thumb, width: pic.width * 100 / pic.height, height: 100 }))
    return {
        list,
        pn
    }
})

function makeHost(url) {
    return 'http://imgs.i8za.com' + url
}

function makeId() {
    return Math.random().toString(36).replace(/\W/, '').slice(1, 6);
}
