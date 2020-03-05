import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

import { connect } from 'react-redux'
import { postCategory } from '../../redux/actions/category'

class Add extends Component {
    state = {
        name: ''
    }

    onChangeValue = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    postCategory = async (event) => {
        // console.log(data)
        event.preventDefault()
        let data = {
            name: this.state.name
        }
        // data.append('name', this.state.name)

        await this.props.dispatch(postCategory(data))
        console.log(this.state);
        await this.props.onHide()
    }

    render() {
      const { show, onHide } = this.props;
      return (
        <Modal show={show} onHide={onHide}>
          <Modal.Header>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.postCategory} encType="multipart/form-data">
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Name' name='name' onChange={this.onChangeValue} />
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