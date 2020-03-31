import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

import { connect } from 'react-redux'
import { postUser } from '../../redux/actions/user'

class Add extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        status: ''
    }

    onChangeValue = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    postUser = async (event) => {
        // console.log(data)
        event.preventDefault()
        let data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            status: this.state.status
        }
        await this.props.dispatch(postUser(data))
        console.log(this.state);
        await this.props.onHide()
    }

    render() {
        const { show, onHide } = this.props;
        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.postUser} encType="multipart/form-data">
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Name' name='name' onChange={this.onChangeValue} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='text' placeholder='Email' name='email' onChange={this.onChangeValue} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='text' placeholder='Password' name='password' onChange={this.onChangeValue} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Control type='text' placeholder='Status' name='status' onChange={this.onChangeValue} />
                        </Form.Group>
                        <Button variant='primary' type='submit'>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default connect()(Add)