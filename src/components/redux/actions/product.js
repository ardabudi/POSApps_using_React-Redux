import axios from 'axios'

export const getProducts = (data) => {
  // const limit = 5
  const limit = data.limit || 6
  const page = data.activePage || ''
  const category = data.activeCategory || ''
  const name = data.searchName || ''
  const sortBy = data.sortBy || 'id'
  const orderBy = data.orderBy || 'ASC'
  return {
    type: 'GET_PRODUCTS',
    payload: axios({
      method: 'GET',
      url: `http://localhost:8001/product/?limit=${limit}&page=${page}&category=${category}&name=${name}&sortBy=${sortBy}&orderBy=${orderBy}`
    })
  }
}

export const postProducts = (data) => {
  return {
    type: 'POST_PRODUCT',
    payload: axios({
      method: 'POST',
      url: 'http://localhost:8001/product',
      data: data
    })
  }
}

export const updateProduct = (productId, data) => {
  return {
    type: 'UPDATE_PRODUCT',
    payload: axios({
      method: 'PATCH',
      url: `http://localhost:8001/product/${productId}`,
      data: data
    })
  }
}

export const deleteProduct = (productId) => {
  return {
    type: 'DELETE_PRODUCT',
    payload: axios({
      method: 'DELETE',
      url: `http://localhost:8001/product/${productId}`
    })
  }
}
