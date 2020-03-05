import React, { Component, Fragment } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getProducts } from '../redux/actions/product'

class CardP extends Component {
  state = {
    activePage: 1,
    searchName: '',
    activeCategory: '',
    sortBy: 'id',
    orderBy: 'ASC',
  }

  onClickMenu = (e) => {
    this.setState({ activeCategory: e.target.id })
    if (e.target.id === '') this.setState({ activeCategory: ''})
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
        sortBy:this.state.sortBy,
        orderBy:  e.target.id,
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

  changePage = (e) => {
    this.setState({ activePage: e })
    const data = {
        activePage: e,
        activeCategory: this.state.activeCategory,
        searchName: this.state.searchName,
        sortBy: this.state.sortBy,
        orderBy: this.state.orderBy
    }
    this.props.dispatch(getProducts(data))
  }

  getProducts () {
    const data = {}
    this.props.dispatch(getProducts(data))
  }

  componentDidMount () {
    this.getProducts()
  }

  render () {
    // console.log(this.props)
    const { products } = this.props
    return (
      <Fragment>
        <div>
        <ul class="nav nav-product" style={{background:'transparent',marginLeft:'180px', marginTop:'-50px', position:'relative', zIndex:'9999', marginRight:'120px'}}>
          <li class="nav-item">
            <Link class="nav-link" id='' onClick={this.onClickMenu}>All</Link>
          </li>
          <li class="nav-item">
              <Link class="nav-link" id="Food" onClick={this.onClickMenu}>Foods</Link>
          </li>
          <li class="nav-item">
              <Link class="nav-link" id="Drink" onClick={this.onClickMenu}>Drinks</Link>
          </li>
          <li class="nav-item dropdown">
            <Link class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Sort</Link>
            <div class="dropdown-menu">
                <Link class="dropdown-item" id="ASC" onClick={this.onOrderBy}>Ascending</Link>
                <Link class="dropdown-item" id="DESC" onClick={this.onOrderBy}>Descending</Link>
            </div>
          </li>
          <li class="nav-item dropdown">
              <Link class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">By</Link>
              <div class="dropdown-menu">
                  {/* <Link class="dropdown-item" id="updated_at" onClick={this.onBy}>Date Added</Link> */}
                  <Link class="dropdown-item" id="name" onClick={this.onSortBy}>Name</Link>
                  <Link class="dropdown-item" id="price" onClick={this.onSortBy}>Price</Link>
              </div>
          </li>
          <form className="form-inline">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" onChange={this.onChangeSearch} />
          </form>
        </ul>
      <div className='row products'>
        {products.map((product, index) =>
          <div className='product-card col-md-6 col-lg-4' key={product.id}>
            <div className='card card1'>
              <img src={product.image} className='card-img-top card2' alt='' />
              <div className='card-body'>
                <div style={{ float: 'left', marginLeft: '10px' }}>
                  <p className='card-text' style={{ marginTop: '-10px' }}>{product.name}</p>
                  <p className='card-title' style={{ marginTop: '-10px' }}>
                          Rp. {product.price}
                  </p>
                </div>
                <div style={{ marginTop: '-6px' }}>
                  <Button style={{ marginLeft: '37px' }} variant='btn btn-outline-primary'><i class='fas fa-cart-plus' /></Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
            {this.props.pages.map(page =>
              <li className="page-item" key={page} id={page} onClick={() => this.changePage(page)}>
                  <Link className="page-link">{page}</Link>
              </li>
            )}
        </ul>
      </nav>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    pages: state.products.pages || [1]

  }
}

export default connect(mapStateToProps)(CardP)
