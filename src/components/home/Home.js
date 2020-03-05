import React, { Component } from 'react'
import Card from './CardP'
import Navbar from '../layouts/Navbar'
// import Cart from './Cart'

class Home extends Component {
  componentDidMount () {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login')
    }
  }

  render () {
    return (
      <>
        <Navbar />
        <div className='row'>
          <div className='col-md-8'>
            <Card />
          </div>
          <div className='col-md-4'>
            {/* <Cart /> */}
          </div>
        </div>
      </>
    )
  }
}

export default Home
