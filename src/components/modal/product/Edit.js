import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

import { connect } from 'react-redux'
import { updateProduct } from '../../redux/actions/product'

class Edit extends Component {
    state = {
        productId: '',
        name: '',
        description: '',
        image: '',
        price: '',
        stock: '',
        id_category: ''
    }

    componentWillReceiveProps({ product }) {
        this.onSetValue(product);
    }

    onSetValue = (product) => {
        this.setState({
            productId: product.id,
            name: product.name,
            description: product.description,
            image: product.image,
            price: product.price,
            stock: product.stock,
            id_category: product.id_category
        })
    }

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

    updateProduct = async (event) => {
        event.preventDefault();
        // const productId = this.props.productId;
        const data = new FormData();
        data.append('name', this.state.name);
        data.append('description', this.state.description);
        data.append('image', this.state.image);
        data.append('price', this.state.price);
        data.append('stock', this.state.stock);
        data.append('id_category', this.state.id_category);
        // console.log(productId)
        // this.props.dispatch(updateProduct(productId, data))
        // await this.props.onHide()
        // console.log(this.state)
        if (this.state.image === "") {
            data.delete("image")
            const productId = this.state.productId
            await this.props.dispatch(updateProduct(productId, data))
            await this.props.onHide()
        } else {
            const productId = this.state.productId
            await this.props.dispatch(updateProduct(productId, data))
            await this.props.onHide()
        }
    }
    
    render() {
        // console.log(this.state)
        const { show, onHide } = this.props
        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>EDIT PRODUCT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.updateProduct} encType="multipart/form-data">
                        <Form.Group>
                            <Form.Label>NAME</Form.Label>
                            <Form.Control type="text" name="name" onChange={this.onChangeValue} value={this.state.name} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>DESCRIPTION</Form.Label>
                            <Form.Control type="text" name="description" onChange={this.onChangeValue} value={this.state.description} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>PRICE</Form.Label>
                            <Form.Control type="text" name="price" onChange={this.onChangeValue} value={this.state.price} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>STOCK</Form.Label>
                            <Form.Control type="text" name="stock" onChange={this.onChangeValue} value={this.state.stock} />
                        </Form.Group>
                        <Form.Group>
                        {/* <label className="col-form-label">IDCategory:</label>
                        <select className="form-control" required name="id_category" onChange={this.onChangeValue}>
                            <option selected disabled>Choose category</option>
                            <option value={1}>Food</option>
                            <option value={2}>Drink</option>
                        </select> */}
                            <Form.Label>CATEGORY</Form.Label>
                            <Form.Control type="text" placeholder="Enter Category" defaultValue={"DEFAULT"} name="id_category" onChange={this.onChangeValue} value={this.state.id_category} as="select">
                                <option value="DEFAULT" disabled>Choose..</option>
                                <option value="1">Food</option>
                                <option value="2">Drink</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>IMAGE</Form.Label>
                            <Form.Control type="file" name="image" onChange={this.onChangeImage} />
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