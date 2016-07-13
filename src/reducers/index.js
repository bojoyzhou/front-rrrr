import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import * as constants from '../constants'
import { REQUEST, RECIEVE, ERROR } from '../constants'
import fetch from 'isomorphic-fetch'
let s = {
    user: {
        isFetching: false,
        username: ''
    },
    post: {
        docid: '',
        title: '',
        author: '',
        cover: '',
        content: '',
        summary: '',
        isSaved: '',
        url: '',
        update: function() {},
        replace: false,
        t: null
    },
    posts: {
        docid: '',
        isFetching: false,
        list: [
            // {
            //     title: '',
            //     date: '',
            //     summary: '',
            //     docid: ''
            // }
        ]
    },
    styles: {
        type: -1,
        "style-1": []
    },
    images: {
        net: [
            // {
            //     id: '',
            //     url: '',
            //     thumb: '',
            //     picked: true
            // }
        ],
        local: [
            // {
            //     id: '',
            //     url: '',
            //     thumb: '',
            //     picked: true
            // }
        ],
        type: 'local',
        pics: [
            // {
            //     id: '',
            //     url: '',
            //     thumb: '',
            //     picked: true
            // }
        ]
    }
}

const user = (state = s.user, action) => {
    return wrap({
        [constants.USER_LOGIN]: wrapperReduce((state, action) => {
            return Object.assign({}, state, {
                isFetching: false,
                username: action.payload.uInfo.uname
            })
        }),
        [constants.USER_GETCURRENT]: wrapperReduce((state, action) => {
            return Object.assign({}, state, {
                isFetching: false,
                username: action.payload.uInfo.uname
            })
        })
    }, state, action)
}

const post = (state = s.post, action) => {
    return wrap({
        [constants.POST_GET_BY_URL]: wrapperReduce((state, action) => {
            return Object.assign({}, state, {
                isFetching: false,
                content: action.payload.result.content,
                title: action.payload.result.title,
                author: action.payload.result.author,
                summary: action.payload.result.summary,
                replace: true,
            })
        }, () => {}, () => {
            return Object.assign({}, state, {
                isFetching: true,
                replace: false,
            })
        }),
        [constants.POST_GET_BY_ID]: wrapperReduce((state, action) => {
            const cover = action.payload.data.pics && action.payload.data.pics[0] || ''
            return Object.assign({}, state, {
                isFetching: false,
                docid: action.payload.data.docid,
                title: action.payload.data.title,
                author: action.payload.data.author,
                content: action.payload.data.content,
                summary: action.payload.data.summary,
                cover: cover,
                t: action.payload.data.t,
                replace: true,
            })
        }, () => {}, () => {
            return Object.assign({}, state, {
                isFetching: true,
                replace: false,
                t: false,
            })
        }),
        [constants.POST_INSERT]: wrapperReduce((state, action) => {
            return Object.assign({}, state, {
                isFetching: false,
                update: (callback) => {
                    return callback(action.payload)
                }
            })
        }),
        [constants.POST_SET]: wrapperReduce((state, action) => {
            return Object.assign({}, state, {
                isFetching: false,
                content: action.payload
            })
        }),
        [constants.POST_SAVE]: wrapperReduce((state, action) => {
            return Object.assign({}, state, {
                docid: action.payload.docid,
                url: 'http://120.25.80.132/userwords/single?docid=' + action.payload.docid,
                isSaved: true
            })
        }),
        [constants.POST_PREVIEW]: wrapperReduce((state, action) => {
            return Object.assign({}, state, {
                url: action.payload.url
            })
        }),
    }, state, action)
}
const posts = (state = s.posts, action) => {
    return wrap({
        [constants.POST_LOAD]: wrapperReduce((state, action) => {
            return Object.assign({}, state, {
                isFetching: false,
                list: action.payload.list
            })
        })
    }, state, action)
}
const styles = (state = s.styles, action) => {
    return wrap({
        [constants.STYLE_GET]: wrapperReduce((state, action) => {
            const { id, list } = action.payload
            let tmp = {
                isFetching: false,
                type: id,
            }
            tmp['style' + id] = list
            return Object.assign({}, state, tmp)
        }),
        [constants.STYLE_RENDER]: wrapperReduce((state, action) => {
            const id = action.payload
            return Object.assign({}, state, {
                isFetching: false,
                type: id,
            })
        }),

    }, state, action)
}
const images = (state = s.images, action) => {
    return wrap({
        [constants.IMAGES_GET]: wrapperReduce((state, action) => {
            return Object.assign({}, state, {
                pics: action.payload,
                isFetching: false
            })
        }),
        [constants.UPLOAD]: wrapperReduce((state, action) => {
            const thumb = action.payload.data.thumb
            const url = action.payload.data.url
            const id = makeId()
            const picked = false
            let list = state[state.type]
            let tmp = {
                isFetching: false
            }
            tmp[state.type] = [...list, {
                thumb,
                url,
                id,
                picked
            }]
            return Object.assign({}, state, tmp)
        }, () => {
            return Object.assign({}, state, {
                isFetching: false
            })
        }, () => {
            return Object.assign({}, state, {
                isFetching: false
            })
        }),
        [constants.IMAGES_SAVE]: wrapperReduce((state, action) => {
            return Object.assign({}, state, {
                pics: [...state.pics, ...action.payload],
                isFetching: false
            })
        }, () => {
            return Object.assign({}, state, {
                isFetching: false
            })
        }, () => {
            return Object.assign({}, state, {
                isFetching: false
            })
        }),
        [constants.IMAGES_DEL]: wrapperReduce((state, action) => {
            const id = action.payload.id
            return Object.assign({}, state, {
                pics: state.pics.filter(pic => (pic.id != id)),
                isFetching: false
            })
        }, () => {
            return Object.assign({}, state, {
                isFetching: false
            })
        }, () => {
            return Object.assign({}, state, {
                isFetching: false
            })
        }),
        [constants.IMAGES_SEARCH]: wrapperReduce((state, action) => {
            var net
            if (action.payload.pn) {
                net = [...state.net, ...action.payload.list]
            } else {
                net = action.payload.list
            }
            return Object.assign({}, state, {
                net: net,
                isFetching: false
            })
        }, () => {
            return Object.assign({}, state, {
                isFetching: false
            })
        }, () => {
            return Object.assign({}, state, {
                isFetching: false
            })
        }),
    }, state, action)
}

function wrap(obj, state, action) {
    for (var i in obj) {
        if (typeof obj[action.type] !== 'function') {
            continue
        }
        // try {
        return obj[action.type](state, action)
            // } catch (e) {
            //     console.log(e)
            // }
    }
    return state
}

function wrapperReduce(recieve, error, request) {
    return (state, action) => {
        if (action.status == REQUEST) {
            return request && request(state, action) || Object.assign({}, state, {
                isFetching: true
            })
        } else if (action.status == ERROR) {
            return error && error(state, action) || Object.assign({}, state, {
                isFetching: false,
            })
        } else {
            return recieve && recieve(state, action) || Object.assign({}, state, {
                isFetching: false,
            })
        }
    }
}
export default combineReducers({
    routing,
    user,
    post,
    posts,
    styles,
    images,
})

function makeId() {
    return Math.random().toString(36).replace(/\W/, '').slice(1, 6);
}
