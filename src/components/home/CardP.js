import React, { Component, Fragment } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProducts } from '../redux/actions/product'
import { postCart } from '../redux/actions/cart'

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

  changePage = (e) => {
    console.log(this.state)
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

  getProducts() {
    const data = {}
    this.props.dispatch(getProducts(data))
  }

  componentDidMount() {
    this.getProducts()
  }

  addToCart = e => {
    var a;
    this.props.productsInCart.map(product => {
      if (parseInt(product.productId) === parseInt(e.id)) {
        a = 0;
        return alert("Already in cart");
      }
      return product;
    });

    if (a !== 0) {
      const data = {
        name: e.name,
        image: e.image,
        productId: e.id,
        price: e.price,
        stock: e.stock,
        quantity: 1
      };
      this.props.dispatch(postCart(data));
    }
  };

  render() {
    // console.log(this.props)
    const { products } = this.props
    const PriceParsed = (data) => {
      return (
        <span>{data.data.toString().split('').reverse().join('').match(/\d{1,3}/g).join('.').split('').reverse().join('')}</span>
      )
    }

    return (
      <Fragment>
        <div className='products'>
          <ul class="nav nav-product">
            <li class="nav-item">
              <Link class="nav-link" id='' onClick={this.onClickMenu}>All</Link>
            </li>
            <li class="nav-item dropdown">
              <Link class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Category</Link>
              <div class="dropdown-menu">
                <Link class="dropdown-item" id="Food" onClick={this.onClickMenu}>Foods</Link>
                <Link class="dropdown-item" id="Drink" onClick={this.onClickMenu}>Drinks</Link>
              </div>
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
                <Link class="dropdown-item" id="updated_at" onClick={this.onBy}>Date Added</Link>
                <Link class="dropdown-item" id="name" onClick={this.onSortBy}>Name</Link>
                <Link class="dropdown-item" id="price" onClick={this.onSortBy}>Price</Link>
              </div>
            </li>
          </ul>

          <div className='row'>
            {products.map((product, index) =>
              <div className='product-card col-md-4' key={product.id}>
                <div className='card card1'>
                  <img src={product.image} className='card-img-top card2' alt='' />
                  <div className='card-body'>
                    <div style={{ float: 'left', marginLeft: '10px' }}>
                      <p className='card-text' style={{ marginTop: '-10px' }}>{product.name}</p>
                      <h6 className='card-title' style={{ marginTop: '-10px' }}>
                        Rp. <PriceParsed data={product.price} />
                      </h6>
                    </div>

                    <div style={{ marginTop: '-6px' }}>
                      <Button onClick={() => (this.addToCart(product))} style={{ marginLeft: '37px' }} variant='btn btn-outline-primary'><i class='fas fa-cart-plus' />
                      </Button>

                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
        <nav style={{ marginTop: '10px' }} aria-label="Page navigation example">
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
    productsInCart: state.cart.cart,
    pages: state.products.pages
  }
}

export default connect(mapStateToProps)(CardP)
