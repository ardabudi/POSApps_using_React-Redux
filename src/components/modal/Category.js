import React, {Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getCategory } from '../redux/actions/category'

import CategoryItem from './category/CategoryItem'
import Add from './category/Add'
import Edit from '../modal/category/Edit'
import Delete from '../modal/category/Delete'

class Category extends Component {
    state = {
        searchName: '',
        showAdd: false,
        showEdit: false,
        showDelete: false,
        selectCategoryEdit: null,
        selectCategoryDelete: null
    }

    onChangeSearch = (e) => {
    this.setState({ serachName: e.target.value })
    const data = {
        searchName: e.target.value
    }
    this.props.dispatch(getCategory(data))
    }

    getCategory() {
        const data={}
        this.props.dispatch(getCategory(data))
    }

    componentDidMount() {
        if (localStorage.getItem('status') !== 'admin' ) {
            alert('Sorry, you are not authorized as an administrator')
            this.props.history.push('/')
        }
        this.getCategory();
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
    
      onSelectCategoryEdit = (category) => {
        this.setState({
          selectCategoryEdit: category,
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

    onSelectCategoryDelete = (category) => {
        // console.log(category)
        this.setState({
          selectCategoryDelete: category,
          showDelete: true
        })
    }

    logout = () => {
        localStorage.removeItem('user-id')
        localStorage.removeItem('token')
        localStorage.removeItem('isAuth')
        localStorage.removeItem('status')
    }

    render () {
        // console.log(this.props.categorys)
        const { categorys } = this.props;
        const itemCategory = categorys.map((category, index) => <CategoryItem key={index} category={category} onSelectCategoryEdit={this.onSelectCategoryEdit} onSelectCategoryDelete={this.onSelectCategoryDelete} />);
        return(
            <div className='ManC'>
                <nav className='navbar sticky-top navbar-expand-lg navbar-light' style={{ background: 'white' }}>
                <div className='container'>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarTogglerDemo01' aria-controls='navbarTogglerDemo01' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon' />
                </button>
                <span>
                <Link to='/' >
                <i style={{color:'Black',fontSize:'20px'}} className='fa fa-home'> CoffeShop</i>
                </Link>
                </span>
                <div className='collapse navbar-collapse' id='navbarTogglerDemo01'>
                    <ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
                    <li style={{ marginLeft: '', marginRight: '20px' }}>
                        <Link to='/product'>Products</Link>
                    </li>
                    </ul>
                    <form className='form-inline my-3 my-lg-0' style={{ marginLeft: '' }}>
                        <input className='form-control mr-sm-2' 
                        type='search'
                        placeholder='search..'
                        style={{boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)'}}
                        onChange={this.onChangeSearch}
                        />
                        <Link to="/login" onClick={this.logout} className='nav-link'>Logout </Link>
                        
                    </form>
                </div>
                </div>
            </nav>
            <Container style={{ marginTop: "20px" }}>
                <Row style={{ marginBottom: "10px" }}>
                    <Col sm={10}>
                        <h4>Management categorys</h4>
                    </Col>
                    <Col sm={2}>
                        <Button variant="primary fas fa-plus" onClick={this.onShowAdd}> Add Category</Button>
                    </Col>
                </Row>
                {/* <Row>
                    
                </Row> */}
                <Row>
                <Table striped bordered hover className='TableMC'>
                    <thead>
                        <tr style={{backgroundColor: 'silver'}}>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemCategory}
                    </tbody>
                </Table>
                </Row>

                <Add show={this.state.showAdd} onHide={this.onCloseAdd} />
                <Edit show={this.state.showEdit} onHide={this.onCloseEdit} category={this.state.selectCategoryEdit} />
                <Delete show={this.state.showDelete} onHide={this.onCloseDelete} category={this.state.selectCategoryDelete} />
            </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        categorys: state.categorys.categorys
    }
}

export default withRouter(connect(mapStateToProps)(Category));