import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

import { connect } from 'react-redux'
import { updateUser } from '../../redux/actions/user'

class Edit extends Component {
    state = {
        userId: '',
        name: '',
        email: '',
        status: ''
    }

    componentWillReceiveProps({ user }) {
        this.onSetValue(user);
    }

    onSetValue = (user) => {
        this.setState({
            userId: user.id,
            name: user.name,
            email: user.email,
            status: user.status
        })
    }

    onChangeValue = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateUser = async (event) => {
        event.preventDefault();
        let data = {
            name: this.state.name,
            email: this.state.email,
            status: this.state.status
        }
        await this.props.dispatch(updateUser(this.state.userId, data))
        await this.props.onHide()
    }
    
    render() {
        // console.log('heyyyy', this.state)
        const { show, onHide } = this.props
        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>EDIT PRODUCT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.updateUser} encType="multipart/form-data">
                        <Form.Group>
                            <Form.Label>NAME</Form.Label>
                            <Form.Control type="text" name="name" onChange={this.onChangeValue} value={this.state.name} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>EMAIL</Form.Label>
                            <Form.Control type="text" name="email" onChange={this.onChangeValue} value={this.state.email} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>STATUS</Form.Label>
                            <Form.Control type="text" name="status" onChange={this.onChangeValue} value={this.state.status} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            SUBMIT
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default connect()(Edit);