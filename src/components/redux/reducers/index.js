import { combineReducers } from 'redux'
import products from './Product'
import categorys from './Category'
import cart from './Cart'

export default combineReducers({
  products,
  categorys,
  cart
})
