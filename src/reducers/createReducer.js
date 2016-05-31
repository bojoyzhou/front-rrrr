import { handleActions } from 'redux-actions'
import ajax from 'ajax'
import { REQUEST, REQUEST_SUCC, REQUEST_ERROR, REQUEST_LOADING } from '../constants'

export const createReducer = (options, initialState) => {
    let actionOptions = { };
    for(const type in options){
        const item = options[type]
        if(typeof item == 'function'){
            actionOptions[type] = item
        }else if(item.preload && item.success){
            actionOptions[type] = wrapperAction(type, item);
        }
    }
    return handleActions(actionOptions, initialState)
}

function wrapperAction(type, item){
    return (state, action) => {
        if(action.status == REQUEST || !action.status){
            const dispatch = action.dispatch;
            let ajaxOption = item.preload(action);
            ajaxOption.success = (result) => {
                let payload = item.success(result);
                dispatch({
                    type,
                    payload,
                    status: REQUEST_SUCC
                })
            }
            ajax(ajaxOption)
            return state
        }else if(action.status == REQUEST_SUCC){
            return action.payload
        }else{
            return state
        }
    }
}