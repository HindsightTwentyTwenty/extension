import {combineReducers} from 'redux'
import tabReducer from './TabReducer'
import pageReducer from './PageReducer'
import categoryReducer from './CategoryReducer'


export default combineReducers({
  tab: tabReducer,
  page: pageReducer,
  category: categoryReducer
})
