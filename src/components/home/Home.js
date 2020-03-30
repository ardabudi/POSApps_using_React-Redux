import React, { Component } from 'react'
import Card from './CardP'
import Navbar from '../layouts/Navbar'
import Cart from '../layouts/Cart'

class Home extends Component {
  componentDidMount () {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login')
    }
  }

  render () {
    return (
      <>
        <div className='row'>
          <div className='col-8' style={{paddingRight: '0'}}>
            <Navbar />
            <Card />
          </div>
          <div className='col-4' style={{paddingRight: '0', paddingLeft: '0'}}>
            <Cart />
          </div>
        </div>
      </>
    )
  }
}

export default Home
