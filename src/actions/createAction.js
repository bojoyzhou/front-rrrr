import {
    REQUEST,
    RECIEVE,
    ERROR
} from '../constants'

export default createAction
export const createActionAsync = (type, async, map) => {
    const request = wrapRequest(type)
    const recieve = wrapRecieve(type)
    const error = wrapError(type)
    return payload => dispatch => {
        dispatch(request())
        async(payload).then(response => response.json())
            .then(json => {
                if (json.ret_code) {
                    return dispatch(error(json))
                }
                if(typeof map == 'function'){
                    json = map(json)
                }
                dispatch(recieve(json))
            })
    }
}

function wrapRequest(type) {
    return createAction(type, REQUEST)
}

function wrapRecieve(type) {
    return createAction(type, RECIEVE)
}

function wrapError(type) {
    return createAction(type, ERROR)
}

function createAction(type, status) {
    return action => ({
        type,
        status,
        payload: action
    })
}
