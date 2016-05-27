import { handleActions } from 'redux-actions'
import actions from '../actions'

import ajax from 'ajax'

const initialState = {
    posts: []
}

export default handleActions({
    'GET_OPTION_POST_LIST' (state, action) {
        if(action.payload.status == 'request' || !action.payload.status){
            ajax({
                url:'/api/collectpager?uid=2',
                dataType:'json',
                success:function(ret){
                    actions.getOptionPostList({
                        posts:ret.list,
                        status:'success'
                    })
                }
            })
            return state;
        }else{
            return action.payload
        }
    }
}, initialState)
