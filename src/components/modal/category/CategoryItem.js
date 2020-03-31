import React from 'react'
import { Button } from 'react-bootstrap'

const CategoryItem = ({ category, onSelectCategoryEdit, onSelectCategoryDelete }) => {
  const onClickEdit = (event) => {
    event.preventDefault()
    onSelectCategoryEdit(category)
  }

  const onClickDelete = (event) => {
    event.preventDefault()
    onSelectCategoryDelete(category)
  }

  return (
    <>
      <tr>
        <td>{category.id}</td>
        <td>{category.name}</td>
        <td><Button variant='warning' size='sm' onClick={onClickEdit}>Edit</Button> - <Button variant='danger' size='sm' onClick={onClickDelete}>Delete</Button></td>
      </tr>
    </>
  )
}

export default CategoryItem
