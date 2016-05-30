
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import optionPostList from './optionPostList'
import commonStyle from './commonStyle'
import userPics from './userPics'
import * as selectPic from './selectPic'

export default combineReducers({
  routing,
  optionPostList,
  commonStyle,
  userPics,
  ...selectPic
})
