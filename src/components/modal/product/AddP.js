import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

import { connect } from 'react-redux'
import { postProducts } from '../../redux/actions/product'

class AddP extends Component {
    state = {
        name: '',
        description: '',
        image: '',
        price: '',
        stock: '',
        id_category: '' || 'default'
    }

    // getProducts() {
    //   this.props.dispatch(getProducts())
    // }

    // componentDidMount() {
    //     this.getProducts();
    // }

    onChangeValue = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onChangeImage = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    }

    postProducts = async (event) => {
        event.preventDefault()
        let data = new FormData()
        data.append('name', this.state.name)
        data.append('description', this.state.description)
        data.append('image', this.state.image)
        data.append('price', this.state.price)
        data.append('stock', this.state.stock)
        data.append('id_category', this.state.id_category)

        await this.props.dispatch(postProducts(data))
        console.log(this.state);
        await this.props.onHide()
    }

    render() {
      const { show, onHide } = this.props;
      return (
        <Modal show={show} onHide={onHide}>
          <Modal.Header>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.postProducts} encType="multipart/form-data">
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Name' name='name' onChange={this.onChangeValue} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type='text' placeholder='description' name='description' onChange={this.onChangeValue} />
              </Form.Group>
              <Form.Group>
                <Form.Label>price</Form.Label>
                <Form.Control type='number' placeholder='price' name='price' onChange={this.onChangeValue} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Stock</Form.Label>
                <Form.Control type='number' placeholder='stock' name='stock' onChange={this.onChangeValue} />
              </Form.Group>
              <Form.Group>
                {/* <Form.Label>Category</Form.Label> */}
                <Form.Label>CATEGORY</Form.Label>
                  <Form.Control type="text" placeholder="Enter Category" defaultValue={"default"}name="id_category" onChange={this.onChangeValue} as="select">
                      <option value="default" disabled>Choose..</option>
                      <option value="1">Food</option>
                      <option value="2">Drink</option>
                      
                  </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Image</Form.Label>
                <Form.Control type='file' name='image' onChange={this.onChangeImage}></Form.Control>
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

export default connect()(AddP)