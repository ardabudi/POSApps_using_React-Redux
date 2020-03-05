import React from 'react'
import { Button } from 'react-bootstrap'

const ProductItem = ({ product, onSelectProductEdit, onSelectProductDelete }) => {
  const onClickEdit = (event) => {
    event.preventDefault()
    onSelectProductEdit(product)
  }

  const onClickDelete = (event) => {
    event.preventDefault()
    onSelectProductDelete(product)
  }

  return (
    <>
      <tr>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td><img style={{height: '43px'}} src={product.image}></img></td>
        <td>Rp. {product.price}</td>
        <td>{product.stock}</td>
        <td>{product.category}</td>
        <td><Button variant='warning' size='sm' onClick={onClickEdit}>Edit</Button> - <Button variant='danger' size='sm' onClick={onClickDelete}>Delete</Button></td>
      </tr>
    </>
  )
}

export default ProductItem
