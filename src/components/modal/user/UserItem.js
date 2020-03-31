import React from 'react'
import { Button } from 'react-bootstrap'

const UserItem = ({ user, onSelectUserEdit, onSelectUserDelete }) => {
    const onClickEdit = (event) => {
        event.preventDefault()
        onSelectUserEdit(user)
    }

    const onClickDelete = (event) => {
        event.preventDefault()
        onSelectUserDelete(user)
    }

    return (
        <>
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td><Button variant='warning' size='sm' onClick={onClickEdit}>Edit</Button> - <Button variant='danger' size='sm' onClick={onClickDelete}>Delete</Button></td>
            </tr>
        </>
    )
}

export default UserItem
