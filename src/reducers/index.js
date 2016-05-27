
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import optionPostList from './optionPostList'

export default combineReducers({
  routing,
  optionPostList
})
