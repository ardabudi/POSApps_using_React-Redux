import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Container, Row, Col, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getProducts } from '../redux/actions/product'

import ProductItem from './product/ProductItem'
import AddP from './product/AddP'
import Edit from '../modal/product/Edit'
import Delete from '../modal/product/Delete'

class Product extends Component {
    state = {
        activePage: 1,
        searchName: '',
        activeCategory: '',
        sortBy: 'id',
        orderBy: 'ASC',

        showAdd: false,
        showEdit: false,
        showDelete: false,
        selectProductEdit: null,
        selectProductDelete: null
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

    getProducts() {
        const data = {}
        this.props.dispatch(getProducts(data))
    }

    componentDidMount() {
        if (localStorage.getItem('status') !== 'admin') {
            alert('Sorry, you are not authorized as an administrator')
            this.props.history.push('/')
        }
        this.getProducts();
    }

    onShowAdd = (event) => {
        this.setState({
            showAdd: true
        })
    }

    onCloseAdd = () => {
        this.setState({
            showAdd: false
        })
    }

    onShowEdit = (event) => {
        this.setState({
            showEdit: true
        })
    }

    onCloseEdit = () => {
        this.setState({
            showEdit: false
        })
    }

    onSelectProductEdit = (product) => {
        this.setState({
            selectProductEdit: product,
            showEdit: true
        })
    }

    onShowDelete = event => {
        this.setState({
            showDelete: true
        })
    }

    onCloseDelete = () => {
        this.setState({
            showDelete: false
        })
    }

    onSelectProductDelete = (product) => {
        // console.log(product)
        this.setState({
            selectProductDelete: product,
            showDelete: true
        })
    }

    logout = () => {
        localStorage.removeItem('user-id')
        localStorage.removeItem('token')
        localStorage.removeItem('isAuth')
        localStorage.removeItem('status')
    }

    render() {
        const { products } = this.props;
        const itemProduct = products.map((product, index) => <ProductItem key={index} product={product} onSelectProductEdit={this.onSelectProductEdit} onSelectProductDelete={this.onSelectProductDelete} />);
        return (
            <div className='ManP'>
                <nav className='navbar sticky-top navbar-expand-lg navbar-light' style={{ background: 'white' }}>
                    <div className='container'>
                        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarTogglerDemo01' aria-controls='navbarTogglerDemo01' aria-expanded='false' aria-label='Toggle navigation'>
                            <span className='navbar-toggler-icon' />
                        </button>
                        <span>
                            <Link to='/' >
                                <i style={{ color: 'Black', fontSize: '20px' }} className='fa fa-home'> CoffeStreet</i>
                            </Link>
                        </span>

                        <div className='collapse navbar-collapse' id='navbarTogglerDemo01'>
                            <form className="form-inline my-3 my-lg-0 ml-auto">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" onChange={this.onChangeSearch} />
                            <ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
                                <li style={{ marginLeft: '', marginRight: '20px' }}>
                                    <Link to='/product'>Products</Link>
                                </li>
                                <li style={{ marginLeft: '', marginRight: '20px' }}>
                                    <Link to='/category'>Categorys</Link>
                                </li>
                            </ul>
                            </form>
                                <Link to="/login" onClick={this.logout} className='nav-link'><i style={{ fontSize: '17px' }} className="fas fa-sign-out-alt"> Logout</i></Link>
                        </div>
                    </div>
                </nav>

                <ul style={{marginLeft: '10%'}} class="nav nav-product">
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
                            <Link class="dropdown-item" id="name" onClick={this.onSortBy}>Name</Link>
                            <Link class="dropdown-item" id="price" onClick={this.onSortBy}>Price</Link>
                        </div>
                    </li>
                </ul>
                <Container style={{ marginTop: "20px" }}>
                    <Row style={{ marginBottom: "10px" }}>
                        <Col sm={10}>
                            <h4>Management products</h4>
                        </Col>
                        <Col sm={2}>
                            <Button variant="primary fas fa-plus" onClick={this.onShowAdd}> Add Product</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Table striped bordered hover className='TableMP'>
                            <thead>
                                <tr style={{ backgroundColor: 'silver' }}>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemProduct}
                            </tbody>
                        </Table>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                {this.props.pages.map(page =>
                                    <li className="page-item" key={page} id={page} onClick={() => this.changePage(page)}>
                                        <Link className="page-link">{page}</Link>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </Row>

                    <AddP show={this.state.showAdd} onHide={this.onCloseAdd} />
                    <Edit show={this.state.showEdit} onHide={this.onCloseEdit} product={this.state.selectProductEdit} />
                    <Delete show={this.state.showDelete} onHide={this.onCloseDelete} product={this.state.selectProductDelete} />

                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        pages: state.products.pages || [1]
    }
}

export default withRouter(connect(mapStateToProps)(Product));