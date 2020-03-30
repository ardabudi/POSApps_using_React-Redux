import axios from 'axios'

export const getCategory = (data) => {
  const name = data.searchName || ''
  return {
    type: 'GET_CATEGORY',
    payload: axios({
      method: 'GET',
      url: `http://localhost:8001/category/?name=${name}`
    })
  }
}

export const postCategory = (data) => {
  return {
    type: 'POST_CATEGORY',
    payload: axios({
      method: 'POST',
      url: 'http://localhost:8001/category',
      data: data
    })
  }
}

export const updateCategory = (categoryId, data) => {
  return {
    type: 'UPDATE_CATEGORY',
    payload: axios({
      method: 'PATCH',
      url: `http://localhost:8001/category/${categoryId}`,
      data: data
    })
  }
}

export const deleteCategory = (categoryId) => {
  return {
    type: 'DELETE_CATEGORY',
    payload: axios({
      method: 'DELETE',
      url: `http://localhost:8001/category/${categoryId}`
    })
  }
}