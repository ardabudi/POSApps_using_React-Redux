import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

import { connect } from 'react-redux'
import { updateCategory } from '../../redux/actions/category'

class Edit extends Component {
    state = {
        categoryId: '',
        name: ''
    }

    componentWillReceiveProps({ category }) {
        this.onSetValue(category);
    }

    onSetValue = (category) => {
        this.setState({
            categoryId: category.id,
            name: category.name,
        })
    }

    onChangeValue = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateCategory = async (event) => {
        event.preventDefault();
        let data = {
            name: this.state.name
        }
        await this.props.dispatch(updateCategory(this.state.categoryId, data))
        await this.props.onHide()
    }
    
    render() {
        // console.log(this.state)
        const { show, onHide } = this.props
        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>EDIT Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form encType="multipart/form-data" onSubmit={this.updateCategory}>
                        <Form.Group>
                            <Form.Label>NAME</Form.Label>
                            <Form.Control type="text" name="name" onChange={this.onChangeValue} value={this.state.name} />
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