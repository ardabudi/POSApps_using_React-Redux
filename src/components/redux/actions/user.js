import axios from 'axios'

export const getUser = (data) => {
    const name = data.searchName || ''
    // console.log(data)
    return {
        type: 'GET_USER',
        payload: axios({
            method: 'GET',
            url: `http://localhost:8001/user/?name=${name}`
        })
    }
}

export const postUser = (data) => {
    return {
        type: 'POST_USER',
        payload: axios({
            method: 'POST',
            url: 'http://localhost:8001/user/register',
            data: data
        })
    }
}

export const updateUser = (userId, data) => {
    return {
        type: 'UPDATE_USER',
        payload: axios({
            method: 'PATCH',
            url: `http://localhost:8001/user/${userId}`,
            data: data
        })
    }
}

export const deleteUser = (userId) => {
    return {
        type: 'DELETE_USER',
        payload: axios({
            method: 'DELETE',
            url: `http://localhost:8001/user/${userId}`
        })
    }
}