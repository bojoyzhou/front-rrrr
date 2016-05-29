import { handleActions } from 'redux-actions'
import actions from '../actions'
import { GET_OPTION_POST_LIST, REQUEST, REQUEST_SUCC, REQUEST_ERROR, REQUEST_LOADING } from '../constants'
import ajax from 'ajax'

const initialState = {
    posts: []
}

export default handleActions({
    GET_OPTION_POST_LIST (state, action) {
        if(action.status == REQUEST || !action.status){
            const dispatch = action.dispatch;
            ajax({
                url:'/api/collectpager?uid=2',
                dataType:'json',
                success:function(ret){
                    dispatch({
                        type: GET_OPTION_POST_LIST,
                        status: REQUEST_SUCC,
                        payload: {
                            posts: [{
                                title:'title',
                                content:'content',
                                source:'hahaha',
                                date:'2016-02-01'
                            }]
                        }
                    });
                }
            })
            return state
        }else if(action.status == REQUEST_SUCC){
            return action.payload
        }else{
            return state
        }
    }
}, initialState)
