import React from 'react'
import { Modal, Button } from 'react-bootstrap'

import { connect } from 'react-redux'
import { deleteProduct } from '../../redux/actions/product'

const Delete = (props) => {
  const { product, show, onHide, dispatch } = props

  const onCancelHandle = (event) => {
    event.preventDefault()
    onHide()
  }

  const onDeleteHandle = async (event) => {
    event.preventDefault()

    await dispatch(deleteProduct(product.id))
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide} variant='lg'>
      <Modal.Header>
        <p>Yakin Untuk Menghapus Product {product ? product.name : ''} ?</p>
      </Modal.Header>
      <Modal.Body>
        <Button variant='primary' size='sm' onClick={onCancelHandle} style={{ marginRight: '10px' }}>Cancel</Button>
        <Button variant='danger' size='sm' onClick={onDeleteHandle}>Delete</Button>
      </Modal.Body>
    </Modal>
  )
}

export default connect()(Delete)
