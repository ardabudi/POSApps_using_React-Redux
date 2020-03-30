import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getProducts } from '../redux/actions/product'
class LayoutNavbar extends Component {
  state = {
    activePage: 1,
    searchName: '',
    activeCategory: '',
    sortBy: 'id',
    orderBy: 'ASC',
  }

  onClickMenu = (e) => {
    // console.log(e.target.id)
    this.setState({ activeCategory: e.target.id })
    if (e.target.id === '') this.setState({ activeCategory: '' })
    const data = {
      activePage: 1,
      activeCategory: e.target.id,
      searchName: '',
      sortBy: 'id',
      orderBy: 'ASC'
    }
    this.props.dispatch(getProducts(data))
  }

  onOrderBy = (e) => {
    this.setState({ orderBy: e.target.id })
    const data = {
      activePage: 1,
      activeCategory: this.state.activeCategory,
      searchName: '',
      sortBy: this.state.sortBy,
      orderBy: e.target.id,
    }
    this.props.dispatch(getProducts(data))
  }

  onSortBy = (e) => {
    this.setState({ sortBy: e.target.id })
    const data = {
      activePage: 1,
      activeCategory: this.state.activeCategory,
      searchName: '',
      sortBy: e.target.id,
      orderBy: this.state.orderBy,
    }
    this.props.dispatch(getProducts(data))
  }

  onChangeSearch = (e) => {
    this.setState({ serachName: e.target.value })
    const data = {
      activePage: 1,
      activeCategory: '',
      searchName: e.target.value,
      sortBy: this.state.sortBy,
      orderBy: this.state.orderBy
    }
    this.props.dispatch(getProducts(data))
  }

  getProducts() {
    const data = {}
    this.props.dispatch(getProducts(data))
  }

  componentDidMount() {
    this.getProducts();
  }

  logout = () => {
    localStorage.removeItem('user-id')
    localStorage.removeItem('token')
    localStorage.removeItem('isAuth')
    localStorage.removeItem('status')
  }

  render() {
    const Check = () => {
      if (localStorage.getItem('status') === 'admin') {
        return (
          <Nav className="mr-auto">
            <NavDropdown style={{ color: 'black' }} title="Management" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link className='navlink' to="/product">Product</Link>
              </NavDropdown.Item>
              <NavDropdown.Item><Link className='navlink' to="/category">Category</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        )
      } else {
        return (
          <div></div>
        )
      }
    }

    return (
      <Navbar bg="white" sticky='top' expand="lg">
        <Navbar.Brand>
          <Link to='/'>
            <i style={{ color: 'Black', fontSize: '20px', marginLeft: '10px' }} className='fa fa-home'> CoffeStreet</i>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Check />
          
          <Form inline className="ml-auto">
            <Link to="/login" onClick={this.logout} className='nav-link'><i style={{ fontSize: '17px' }} className="fas fa-sign-out-alt"> Logout</i></Link>
          </Form>

          <Form inline>
            <FormControl type="Search" placeholder="Search" className="mr-sm-2" onChange={this.onChangeSearch} />
          </Form>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const navbarStateToProps = (state) => {
  return {
    products: state.products.products,
  }
}

export default withRouter(connect(navbarStateToProps)(LayoutNavbar));