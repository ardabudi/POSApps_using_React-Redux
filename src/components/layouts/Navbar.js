import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

class LayoutNavbar extends Component {
  logout = () => {
    localStorage.removeItem('user-id')
    localStorage.removeItem('token')
    localStorage.removeItem('isAuth')
    localStorage.removeItem('status')
  }

  render () {
    return (
      <Row>
        <Col sm={8}>
          <nav className='navbar sticky-top navbar-expand-lg navbar-light' style={{ background: 'white', height: '60px' }}>
            <div className='container'>
              <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarTogglerDemo01' aria-controls='navbarTogglerDemo01' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon' />
              </button>
              <span>
                <Link to='/'>
                  <i style={{ color: 'Black', fontSize: '20px' }} className='fa fa-home'> AbsCoffeShop</i>
                </Link>
              </span>

            </div>
            <div className='collapse navbar-collapse' id='navbarTogglerDemo01'>
              <div class='btn-group dropright'>
                <button type='button' className='fas fa-sort' style={{ fontSize: '1.75em', color: 'Black', border: 'none', backgroundColor: 'transparent', marginLeft: '20px' }} data-target='#sort' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' />
                <div class='dropdown-menu'>
                  <li>
                    <Link to='/product'><span className='fa fa-home' /> Products</Link>
                  </li>
                  <li>
                    <Link to='/category'><span className='fa fa-home' /> Category</Link>
                  </li>
                </div>
                <form className='form-inline my-3 my-lg-0' style={{ marginLeft: '' }}>
                  <Link className='nav-link' to="/login" onClick={this.logout}>Logout </Link>
                </form>
              </div>
            </div>
          </nav>
        </Col>
        <Col sm={4}>
          <nav style={{ marginLeft: '-25px' }} className='navbar sticky-top navbar-expand-lg navbar-light'>
            <h6 style={{ height: '34px', marginLeft: '150px' }}>Cart
              <span className='badge badge-primary badge-pill'>0</span>
            </h6>
          </nav>
        </Col>
      </Row>
    )
  }
}

const navbarStateToProps = (state) => {
  return {
    products: state.products.products
  }
}

export default connect(navbarStateToProps)(LayoutNavbar)
