import { handleActions } from 'redux-actions'
import ajax from 'ajax'
import { REQUEST, REQUEST_SUCC, REQUEST_ERROR, REQUEST_LOADING, HIDE_LOADING, SHOW_LOADING } from '../constants'

import store from '../store'
export const createReducer = (options, initialState) => {
    let actionOptions = { };
    for(const type in options){
        const item = options[type]
        if(typeof item == 'function'){
            actionOptions[type] = item
        }else if(item.preload && item.success){
            actionOptions[type] = wrapperAction(type, item);
        }else{
            actionOptions[type] = item
        }
    }
    return handleActions(actionOptions, initialState)
}

export const assign = (target, dest) => {
    let obj = Object.assign({}, target)
    return Object.assign(obj, dest)
}
var counter = 0;
function wrapperAction(type, item){
    return (state, action) => {
        if(action.status == REQUEST || !action.status){
            const dispatch = action.dispatch
            let ajaxOption = item.preload(action, state)
            if(!ajaxOption.url){
                return ajaxOption
            }
            ajaxOption.success = (result) => {
                counter--
                console.log(counter)
                counter == 0 && setTimeout(() => {
                    dispatch({
                        type: HIDE_LOADING
                    })
                })
                if(action.payload && action.payload.hook){
                    if(action.payload.hook(result) === false){
                        return
                    }
                }
                let payload = item.success(result, state, action)
                dispatch({
                    type,
                    payload,
                    status: REQUEST_SUCC
                })
            }
            counter ++;
            setTimeout(() => {
                dispatch({
                    type: SHOW_LOADING
                })
            })
            ajax(ajaxOption)
            return state
        }else if(action.status == REQUEST_SUCC){
            if (typeof action.payload.complete === 'function') {
                setTimeout(() => {
                    action.payload.complete(action)
                })
            }
            return action.payload
        }else{
            return state
        }
    }
}
