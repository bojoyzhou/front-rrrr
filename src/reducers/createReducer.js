import { handleActions } from 'redux-actions'
import ajax from 'ajax'
import { REQUEST, REQUEST_SUCC, REQUEST_ERROR, REQUEST_LOADING } from '../constants'

export const createReducer = (type, options, hook, initialState) => {
    let actionOptions = { };
    actionOptions[type] = (state, action) => {
        if(action.status == REQUEST || !action.status){
            const dispatch = action.dispatch;
            let ajaxOption = options(action);
            ajaxOption.success = (result) => {
                let payload = hook(result);
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
    return handleActions(actionOptions, initialState)
}

export const createReducerSync = (type, hook, initialState) => {
    let actionOptions = {}
    actionOptions[type] = hook
    return handleActions(actionOptions, initialState)
}
