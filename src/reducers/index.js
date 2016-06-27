
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import optionPostList from './optionPostList'
import commonStyle from './commonStyle'
import selectPic from './selectPic'
import login from './login'
import textArea from './textArea'
import prompt from './prompt'
import loading from './loading'

export default combineReducers({
    routing,
    optionPostList,
    commonStyle,
    selectPic,
    login,
    textArea,
    prompt,
    loading,
})
