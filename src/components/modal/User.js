import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../../App.css'
import { connect } from 'react-redux'
import { getUser } from '../redux/actions/user'
import UserItem from './user/UserItem'
import Add from './user/Add'
import Edit from '../modal/user/Edit'
import Delete from '../modal/user/Delete'

class User extends Component {
    state = {
        searchName: '',
        showAdd: false,
        showEdit: false,
        showDelete: false,
        selectUserEdit: null,
        selectUserDelete: null
    }

    onChangeSearch = (e) => {
        this.setState({ searchName: e.target.value })
        const data = {
            searchName: e.target.value
        }
        this.props.dispatch(getUser(data))
    }

    getUser() {
        const data = {}
        this.props.dispatch(getUser(data))
    }

    componentDidMount() {
        if (localStorage.getItem('status') !== 'admin') {
            alert('Sorry, you are not authorized as an administrator')
            this.props.history.push('/')
        }
        this.getUser();
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

    onSelectUserEdit = (user) => {
        this.setState({
            selectUserEdit: user,
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

    onSelectUserDelete = (user) => {
        // console.log(user)
        this.setState({
            selectUserDelete: user,
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
        // console.log(this.props.user)
        const { user } = this.props;
        const itemUser = user.map((user, index) => <UserItem key={index} user={user} onSelectUserEdit={this.onSelectUserEdit} onSelectUserDelete={this.onSelectUserDelete} />);
        return (
            <div className='ManUser'>
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
                            <div class="nav-item dropdown">
                                <Link class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Management</Link>
                                <div class="dropdown-menu">
                                    <Link class="dropdown-item" to="/product">Product</Link>
                                    <Link class="dropdown-item" to="/category">Category</Link>
                                </div>
                            </div>
                            <form className='form-inline my-3 my-lg-0 ml-auto'>
                                <input className='form-control mr-sm-2'
                                    type='search'
                                    placeholder='search..'
                                    style={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)' }}
                                    onChange={this.onChangeSearch}
                                />
                                <Link to="/login" onClick={this.logout} className='nav-link'><i style={{ fontSize: '17px' }} className="fas fa-sign-out-alt"> Logout</i></Link>
                            </form>
                        </div>
                    </div>
                </nav>
                <Container style={{ marginTop: "20px" }}>
                    <Row style={{ marginBottom: "10px" }}>
                        <Col sm={10}>
                            <h4>Management Users</h4>
                        </Col>
                        <Col sm={2}>
                            <Button variant="primary fas fa-plus" onClick={this.onShowAdd}> Add User</Button>
                        </Col>
                    </Row>

                    <Row>
                        <Table striped bordered hover className='TableMC'>
                            <thead>
                                <tr style={{ backgroundColor: 'silver' }}>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemUser}
                            </tbody>
                        </Table>
                    </Row>

                    <Add show={this.state.showAdd} onHide={this.onCloseAdd} />
                    <Edit show={this.state.showEdit} onHide={this.onCloseEdit} user={this.state.selectUserEdit} />
                    <Delete show={this.state.showDelete} onHide={this.onCloseDelete} user={this.state.selectUserDelete} />
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}

export default withRouter(connect(mapStateToProps)(User));