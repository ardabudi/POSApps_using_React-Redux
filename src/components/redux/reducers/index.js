import { combineReducers } from 'redux'
import products from './Product'
import categorys from './Category'
import cart from './Cart'
import user from './User'

export default combineReducers({
  products,
  categorys,
  user,
  cart
})
