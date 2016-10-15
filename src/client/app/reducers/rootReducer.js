import {combineReducers} from 'redux'
import tabReducer from './tabReducer'
import pageReducer from './pageReducer'


export default combineReducers({
  tab: tabReducer
  page: pageReducer
})
