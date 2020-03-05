import React from 'react'
import { Modal, Button } from 'react-bootstrap'

import { connect } from 'react-redux'
import { deleteCategory } from '../../redux/actions/category'

const Delete = (props) => {
  const { category, show, onHide, dispatch } = props

  const onCancelHandle = (event) => {
    event.preventDefault()
    onHide()
  }

  const onDeleteHandle = async (event) => {
    event.preventDefault()
    console.log(category)
    await dispatch(deleteCategory(category.id))
    onHide()
  }


  return (
    <Modal show={show} onHide={onHide} variant='lg'>
      <Modal.Header>
        <p>Yakin Untuk Menghapus Category {category ? category.name : ''} ?</p>
      </Modal.Header>
      <Modal.Body>
        <Button variant='primary' size='sm' onClick={onCancelHandle} style={{ marginRight: '10px' }}>Cancel</Button>
        <Button variant='danger' size='sm' onClick={onDeleteHandle}>Delete</Button>
      </Modal.Body>
    </Modal>
  )
}

export default connect()(Delete)
