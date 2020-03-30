import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './components/redux/store'

import Home from './components/home/Home'
import Login from './components/auth/Login'
import Product from './components/modal/Product'
import Category from './components/modal/Category'

function App () {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/product' component={Product} />
        <Route path='/category' component={Category} />
      </Router>
    </Provider>
  )
}

export default App
