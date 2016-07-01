import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import * as constants from '../constants'
import { REQUEST, RECIEVE, ERROR } from '../constants'
import fetch from 'isomorphic-fetch'
let s = {
    routing: '',
    location: '',
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
        isSaved: ''
    },
    posts: {
        docid: '',
        isFetching: false,
        list: [{
            title: '',
            date: '',
            summary: '',
            docid: ''
        }]
    },
    styles: {
        type: 0,
        styletype: ['', '']
    },
    images: {
        net: [{
            id: '',
            url: '',
            thumb: '',
            picked: true
        }],
        local: [{
            id: '',
            url: '',
            thumb: '',
            picked: true
        }],
        type: 'net',
        pics: [{
            id: '',
            url: '',
            thumb: '',
            picked: true
        }]
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
                docid: action.payload.result.docid,
                title: action.payload.result.title,
                author: action.payload.result.author,
                summary: action.payload.result.summary
            })
        }),
        [constants.POST_GET_BY_ID]: wrapperReduce((state, action) => {
            debugger
            return Object.assign({}, state, {
                isFetching: false,
                content: action.payload.data.content,
                docid: action.payload.data.docid,
                title: action.payload.data.title,
                author: action.payload.data.author,
                cover: action.payload.data.pics[0] || '',
                summary: action.payload.data.summary,
            })
        })
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
        ['type']: () => {
            return state
        }
    }, state, action)
}
const images = (state = s.images, action) => {
    return wrap({
        ['type']: () => {
            return state
        }
    }, state, action)
}

function wrap(obj, state, action) {
    for (var i in obj) {
        try {
            return obj[action.type](state, action)
        } catch (e) {}
        return state
    }
}

function wrapperReduce(recieve, error, request) {
    return (state, action) => {
        if (action.status == REQUEST) {
            return request && request(state, action) || Object.assign({}, state, {
                isFetching: true
            })
        } else if (action.status == RECIEVE) {
            return recieve && recieve(state, action) || Object.assign({}, state, {
                isFetching: false,
            })
        } else if (action.status == ERROR) {
            return error && error(state, action) || Object.assign({}, state, {
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
