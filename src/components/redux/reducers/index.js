import { combineReducers } from 'redux'

import products from './Product'
import categorys from './Category'

export default combineReducers({
  products,
  categorys
})
